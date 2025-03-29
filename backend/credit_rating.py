import logging
from sqlalchemy.orm import Session
from models import Mortgage
from typing import List
from logger import logger

class CreditRatingCalculator:
    def __init__(self, mortgage: Mortgage):
        """
        Initializes with a mortgage record from the database.
        """
        self.id = mortgage.id
        self.credit_score = mortgage.credit_score
        self.loan_amount = mortgage.loan_amount
        self.property_value = mortgage.property_value
        self.annual_income = mortgage.annual_income
        self.debt_amount = mortgage.debt_amount
        self.loan_type = mortgage.loan_type.lower()
        self.property_type = mortgage.property_type.lower()

        logger.debug(f"Initialized CreditRatingCalculator with Mortgage ID: {mortgage.id}")

    def calculate_ltv(self) -> float:
        """Calculates Loan-to-Value (LTV) Ratio."""
        ltv = self.loan_amount / self.property_value
        logger.debug(f"Calculated LTV: {ltv:.2f} (Loan: {self.loan_amount}, Property Value: {self.property_value})")
        return ltv

    def calculate_dti(self) -> float:
        """Calculates Debt-to-Income (DTI) Ratio."""
        dti = self.debt_amount / self.annual_income
        logger.debug(f"Calculated DTI: {dti:.2f} (Debt: {self.debt_amount}, Income: {self.annual_income})")
        return dti

    def get_risk_score(self) -> int:
        """Computes the risk score based on business rules."""
        risk_score = 0

        ltv = self.calculate_ltv()
        if ltv > 0.90:
            risk_score += 2
            logger.debug("LTV > 0.90: Added 2 to risk score")
        elif ltv > 0.80:
            risk_score += 1
            logger.debug("LTV between 0.80 and 0.90: Added 1 to risk score")

        dti = self.calculate_dti()
        if dti > 0.50:
            risk_score += 2
            logger.debug("DTI > 0.50: Added 2 to risk score")
        elif dti > 0.40:
            risk_score += 1
            logger.debug("DTI between 0.40 and 0.50: Added 1 to risk score")

        if self.credit_score >= 700:
            risk_score -= 1
            logger.debug("Credit Score >= 700: Subtracted 1 from risk score")
        elif self.credit_score < 650:
            risk_score += 1
            logger.debug("Credit Score < 650: Added 1 to risk score")

        if self.loan_type == "fixed":
            risk_score -= 1
            logger.debug("Fixed Loan Type: Subtracted 1 from risk score")
        elif self.loan_type == "adjustable":
            risk_score += 1
            logger.debug("Adjustable Loan Type: Added 1 to risk score")

        if self.property_type == "condo":
            risk_score += 1
            logger.debug("Property Type Condo: Added 1 to risk score")

        final_risk_score = max(risk_score, 0)  # Ensure risk score is non-negative
        logger.info(f"Mortgage ID: {self.id} Final Risk Score: {final_risk_score}")
        return final_risk_score

    @staticmethod
    def get_final_credit_rating(mortgages: List['CreditRatingCalculator']) -> str:
        """
        Calculates the final credit rating for multiple mortgages based on the average credit score.
        """
        if not mortgages:
            logger.warning("No mortgages found in the database.")
            return "No mortgages available"

        total_risk_score = sum(m.get_risk_score() for m in mortgages)
        avg_credit_score = sum(m.credit_score for m in mortgages) // len(mortgages)

        logger.info(f"Total Risk Score: {total_risk_score}, Average Credit Score: {avg_credit_score}")

        # Adjust final risk score based on average credit score
        if avg_credit_score >= 700:
            total_risk_score -= 1
            logger.debug("Average Credit Score >= 700: Subtracted 1 from total risk score")
        elif avg_credit_score < 650:
            total_risk_score += 1
            logger.debug("Average Credit Score < 650: Added 1 to total risk score")

        # Assign Credit Rating based on total risk score
        if total_risk_score <= 2:
            rating = "AAA"
        elif 3 <= total_risk_score <= 5:
            rating = "BBB"
        else:
            rating = "C"

        logger.info(f"Final Credit Rating: {rating}")
        return rating
