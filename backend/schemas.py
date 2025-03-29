import datetime
from pydantic import BaseModel, Field, ConfigDict
from typing import List
from enum import Enum

# Enum for Loan Type
class LoanTypeEnum(str, Enum):
    fixed = "fixed"
    adjustable = "adjustable"

# Enum for Property Type
class PropertyTypeEnum(str, Enum):
    single_family = "single_family"
    condo = "condo"

# Request Model for Creating a Mortgage
class MortgageCreate(BaseModel):
    credit_score: int = Field(..., ge=300, le=850)
    loan_amount: float
    property_value: float
    annual_income: float
    debt_amount: float
    loan_type: LoanTypeEnum  # Uses Enum
    property_type: PropertyTypeEnum  # Uses Enum

# Response Model with ID & Timestamp
class MortgageResponse(MortgageCreate):
    id: int
    created_at: datetime
    
    model_config = ConfigDict(arbitrary_types_allowed=True)
