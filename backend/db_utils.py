from credit_rating import CreditRatingCalculator
from sqlalchemy.orm import Session
from models import Mortgage
from schemas import MortgageCreate

def insert_mortgage(db: Session, mortgage_data: MortgageCreate):
    db_mortgage = Mortgage(**mortgage_data.dict())
    db.add(db_mortgage)
    db.commit()
    db.refresh(db_mortgage)
    db_response_mortgages = db.query(Mortgage).all()
    all_mortgages = [CreditRatingCalculator(m) for m in db_response_mortgages]
    final_rating = CreditRatingCalculator.get_final_credit_rating(all_mortgages)


    return {"Updated RBMS Credit Rating": final_rating}

def get_all_mortgages(db: Session):
    return db.query(Mortgage).all()

def update_mortgage(db: Session, mortgage_id: int, mortgage_data: MortgageCreate):
    """
    Updates an existing mortgage in the database.
    """
    mortgage = db.query(Mortgage).filter(Mortgage.id == mortgage_id).first()
    if not mortgage:
        return None

    for key, value in mortgage_data.dict().items():
        setattr(mortgage, key, value)

    db.commit()
    db.refresh(mortgage)
    return True


def delete_mortgage(db: Session, mortgage_id: int) -> bool:
    """
    Deletes a mortgage from the database.
    """
    mortgage = db.query(Mortgage).filter(Mortgage.id == mortgage_id).first()
    if not mortgage:
        return False

    db.delete(mortgage)
    db.commit()
    return True
