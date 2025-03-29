from database import Base
from sqlalchemy import Column, Integer, Float, Enum, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import validates


class Mortgage(Base):
    __tablename__ = "mortgages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    credit_score = Column(Integer, nullable=False)
    loan_amount = Column(Float, nullable=False)
    property_value = Column(Float, nullable=False)
    annual_income = Column(Float, nullable=False)
    debt_amount = Column(Float, nullable=False)
    loan_type = Column(Enum('fixed', 'adjustable'), nullable=False)
    property_type = Column(Enum('single_family', 'condo'), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())

    @validates("credit_score")
    def validate_credit_score(self, key, value):
        if not (300 < value < 850):
            raise ValueError(f"Invalid credit score: {value}. Must be between 300 and 850.")
        return value

    @validates("loan_amount", "property_value", "annual_income","debt_amount")
    def validate_positive_values(self, key, value):
        if value <= 0:
            raise ValueError(f"{key} must be greater than 0. Given: {value}")
        return value

    @validates("loan_type")
    def validate_loan_type(self, key, value):
        valid_types = {"fixed", "adjustable"}
        if value not in valid_types:
            raise ValueError(f"Invalid loan type: {value}.")
        return value

    @validates("property_type")
    def validate_property_type(self, key, value):
        valid_types = {"single_family", "condo"}
        if value not in valid_types:
            raise ValueError(f"Invalid property type: {value}.")
        return value

