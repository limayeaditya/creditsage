from credit_rating import CreditRatingCalculator
from sqlalchemy.orm import Session
from models import Mortgage
from schemas import MortgageCreate

def update_credit_rating(db:Session):
    db_response_mortgages = db.query(Mortgage).all()
    all_mortgages = [CreditRatingCalculator(m) for m in db_response_mortgages]
    final_rating = CreditRatingCalculator.get_final_credit_rating(all_mortgages)
    return final_rating

def insert_mortgage(db: Session, mortgage_data: MortgageCreate):
    db_mortgage = Mortgage(**mortgage_data.dict())
    db.add(db_mortgage)
    db.commit()
    db.refresh(db_mortgage)
    
    final_rating = update_credit_rating(db)

    return final_rating

def get_all_mortgages(db: Session):
    return db.query(Mortgage).all()

def update_mortgage(db: Session, mortgage_id: int, mortgage_data: MortgageCreate):
    mortgage = db.query(Mortgage).filter(Mortgage.id == mortgage_id).first()
    if not mortgage:
        return None

    for key, value in mortgage_data.dict().items():
        setattr(mortgage, key, value)

    db.commit()
    db.refresh(mortgage)
    
    final_rating = update_credit_rating(db)

    return final_rating

def delete_mortgage(db: Session, mortgage_id: int) -> bool:
    mortgage = db.query(Mortgage).filter(Mortgage.id == mortgage_id).first()
    if not mortgage:
        return False

    db.delete(mortgage)
    db.commit()

    final_rating = update_credit_rating(db)

    return final_rating
