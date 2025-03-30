from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import MortgageCreate, MortgageResponse
from db_utils import insert_mortgage, delete_mortgage, get_all_mortgages, update_credit_rating, update_mortgage
from logger import logger
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="CreditSage: Mortgage Credit Rating API for RBMS")

origins = [
    "http://localhost:3000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],  
)

@app.post("/mortgages/", response_model=dict)
def add_mortgage(mortgage: MortgageCreate, db: Session = Depends(get_db)):
    try:
        result = insert_mortgage(db, mortgage)
        logger.info(f"New mortgage added: {result}")
        return {"message": "Mortgage updated successfully",
                "Updated Credit Rating": result
                }
    except Exception as e:
        logger.error(f"Error adding mortgage: {str(e)}")
        raise HTTPException(status_code=400, detail="Error processing mortgage")

@app.get("/mortgages/", response_model=list[MortgageResponse])
def fetch_mortgages(db: Session = Depends(get_db)):
    try:
        mortgages = get_all_mortgages(db)
        logger.info("Fetched all mortgages")
        return mortgages
    except Exception as e:
        logger.error(f"Error fetching mortgages: {str(e)}")
        raise HTTPException(status_code=500, detail="Could not fetch data")

@app.put("/mortgages/{mortgage_id}/", response_model=dict)
def edit_mortgage(mortgage_id: int, updated_mortgage: MortgageCreate, db: Session = Depends(get_db)):
    try:
        result = update_mortgage(db, mortgage_id, updated_mortgage)
        if not result:
            logger.warning(f"Mortgage with ID {mortgage_id} not found for update")
            raise HTTPException(status_code=404, detail="Mortgage not found")

        logger.info(f"Mortgage updated: ID {mortgage_id}")
        return {"message": "Mortgage updated successfully",
                "Updated Credit Rating": result
                }
    except Exception as e:
        logger.error(f"Error updating mortgage {mortgage_id}: {str(e)}")
        raise HTTPException(status_code=400, detail="Error updating mortgage")

@app.delete("/mortgages/{mortgage_id}/", response_model=dict)
def remove_mortgage(mortgage_id: int, db: Session = Depends(get_db)):
    try:
        result = delete_mortgage(db, mortgage_id)
        if not result:
            logger.warning(f"Mortgage with ID {mortgage_id} not found for deletion")
            raise HTTPException(status_code=404, detail="Mortgage not found")

        logger.info(f"Mortgage with ID {mortgage_id} deleted successfully")
        return {"message": "Mortgage updated successfully",
                "Updated Credit Rating": result
                }
    except Exception as e:
        logger.error(f"Error deleting mortgage {mortgage_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Could not delete mortgage")
    
@app.get("/credit-rating/", response_model=dict)
def fetch_credit_rating(db: Session = Depends(get_db)):
    try:
        result = update_credit_rating(db)
        logger.info("Fetched all mortgages")
        return {"message": "Credit Rating fetched successfully",
                "Updated Credit Rating": result
                }
    except Exception as e:
        logger.error(f"Error fetching mortgages: {str(e)}")
        raise HTTPException(status_code=500, detail="Could not fetch data")