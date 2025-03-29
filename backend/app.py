from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import MortgageCreate, MortgageResponse
from db_utils import insert_mortgage, delete_mortgage, get_all_mortgages, update_mortgage
from logger import logger


app = FastAPI(title="CreditSage: Mortgage Credit Rating API for RBMS")


@app.post("/mortgages/", response_model=dict)
def add_mortgage(mortgage: MortgageCreate, db: Session = Depends(get_db)):
    try:
        result = insert_mortgage(db, mortgage)
        logger.info(f"New mortgage added: {result}")
        return result
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
        mortgage = update_mortgage(db, mortgage_id, updated_mortgage)
        if not mortgage:
            logger.warning(f"Mortgage with ID {mortgage_id} not found for update")
            raise HTTPException(status_code=404, detail="Mortgage not found")

        logger.info(f"Mortgage updated: ID {mortgage_id}")
        return {"message": "Mortgage updated successfully"}
    except Exception as e:
        logger.error(f"Error updating mortgage {mortgage_id}: {str(e)}")
        raise HTTPException(status_code=400, detail="Error updating mortgage")


@app.delete("/mortgages/{mortgage_id}/", response_model=dict)
def remove_mortgage(mortgage_id: int, db: Session = Depends(get_db)):
    try:
        deleted = delete_mortgage(db, mortgage_id)
        if not deleted:
            logger.warning(f"Mortgage with ID {mortgage_id} not found for deletion")
            raise HTTPException(status_code=404, detail="Mortgage not found")

        logger.info(f"Mortgage with ID {mortgage_id} deleted successfully")
        return {"message": "Mortgage deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting mortgage {mortgage_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Could not delete mortgage")