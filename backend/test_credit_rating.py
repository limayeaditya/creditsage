import pytest
from models import Mortgage
from credit_rating import CreditRatingCalculator


@pytest.fixture
def mortgages():
    """Fixture to create various mortgage test cases."""
    return {
    "low_risk": Mortgage(id=1, credit_score=800, loan_amount=50000,
                         property_value=100000, annual_income=80000,
                         debt_amount=10000, loan_type="fixed", property_type="single_family"),

    "high_risk": Mortgage(id=2, credit_score=600, loan_amount=95000,
                          property_value=100000, annual_income=40000,
                          debt_amount=25000, loan_type="adjustable", property_type="condo"),

    "moderate_risk": Mortgage(id=3, credit_score=680, loan_amount=90000,
                              property_value=100000, annual_income=50000,
                              debt_amount=20000, loan_type="adjustable", property_type="single_family"),

}
    
def test_ltv_calculation(mortgages):
    """Test the Loan-to-Value (LTV) ratio calculation."""
    calculator = CreditRatingCalculator(mortgages["low_risk"])
    assert calculator.calculate_ltv() == 0.5


def test_dti_calculation(mortgages):
    """Test the Debt-to-Income (DTI) ratio calculation."""
    calculator = CreditRatingCalculator(mortgages["low_risk"])
    assert calculator.calculate_dti() == 0.125


def test_credit_rating_calculation(mortgages):
    """Test final credit rating for multiple mortgages."""
    mortgage_calculators = [CreditRatingCalculator(mortgages["low_risk"]),
                            CreditRatingCalculator(mortgages["high_risk"]),
                            CreditRatingCalculator(mortgages["moderate_risk"])]

    rating = CreditRatingCalculator.get_final_credit_rating(mortgage_calculators)
    assert rating == "BBB"  # Based on the average risk score



def test_different_loan_types(mortgages):
    """Test risk score impact of fixed vs. adjustable loans."""
    fixed_calculator = CreditRatingCalculator(mortgages["low_risk"])
    adjustable_calculator = CreditRatingCalculator(mortgages["high_risk"])

    assert fixed_calculator.get_risk_score() < adjustable_calculator.get_risk_score()


def test_different_property_types(mortgages):
    """Test risk score impact of single_family vs. condo properties."""
    single_family_calculator = CreditRatingCalculator(mortgages["low_risk"])
    condo_calculator = CreditRatingCalculator(mortgages["high_risk"])

    assert condo_calculator.get_risk_score() > single_family_calculator.get_risk_score()


def test_no_mortgages():
    """Test behavior when no mortgages are provided."""
    rating = CreditRatingCalculator.get_final_credit_rating([])
    assert rating == "No mortgages available"


def test_invalid_credit_score():
    """Test handling of invalid credit scores (out of range)."""
    with pytest.raises(ValueError, match="Invalid credit score: -50. Must be between 300 and 850."):
        Mortgage(id=8, credit_score=-50, loan_amount=100000,
                 property_value=200000, annual_income=50000,
                 debt_amount=10000, loan_type="fixed", property_type="single_family")

def test_invalid_loan_amount():
    """Test handling of invalid loan amounts (negative or zero values)."""
    with pytest.raises(ValueError, match="loan_amount must be greater than 0. Given: -100000"):
        Mortgage(id=9, credit_score=750, loan_amount=-100000,
                 property_value=200000, annual_income=50000,
                 debt_amount=10000, loan_type="fixed", property_type="single_family")

    with pytest.raises(ValueError, match="loan_amount must be greater than 0. Given: 0"):
        Mortgage(id=9, credit_score=750, loan_amount=0,
                 property_value=200000, annual_income=50000,
                 debt_amount=10000, loan_type="fixed", property_type="single_family")


def test_invalid_property_value():
    """Test handling of invalid property values (negative or zero values)."""
    with pytest.raises(ValueError, match="property_value must be greater than 0. Given: -200000"):
        Mortgage(id=10, credit_score=750, loan_amount=100000,
                 property_value=-200000, annual_income=50000,
                 debt_amount=10000, loan_type="fixed", property_type="single_family")

    with pytest.raises(ValueError, match="property_value must be greater than 0. Given: 0"):
        Mortgage(id=10, credit_score=750, loan_amount=100000,
                 property_value=0, annual_income=50000,
                 debt_amount=10000, loan_type="fixed", property_type="single_family")


def test_invalid_annual_income():
    """Test handling of invalid annual incomes (negative or zero values)."""
    with pytest.raises(ValueError, match="annual_income must be greater than 0. Given: -50000"):
        Mortgage(id=11, credit_score=750, loan_amount=100000,
                 property_value=200000, annual_income=-50000,
                 debt_amount=10000, loan_type="fixed", property_type="single_family")

    with pytest.raises(ValueError, match="annual_income must be greater than 0. Given: 0"):
        Mortgage(id=11, credit_score=750, loan_amount=100000,
                 property_value=200000, annual_income=0,
                 debt_amount=10000, loan_type="fixed", property_type="single_family")


def test_invalid_debt_amount():
    """Test handling of invalid debt amounts (negative or zero values)."""
    with pytest.raises(ValueError, match="debt_amount must be greater than 0. Given: -10000"):
        Mortgage(id=12, credit_score=750, loan_amount=100000,
                 property_value=200000, annual_income=50000,
                 debt_amount=-10000, loan_type="fixed", property_type="single_family")

    with pytest.raises(ValueError, match="debt_amount must be greater than 0. Given: 0"):
        Mortgage(id=12, credit_score=750, loan_amount=100000,
                 property_value=200000, annual_income=50000,
                 debt_amount=0, loan_type="fixed", property_type="single_family")



def test_invalid_loan_type():
    """Test handling of invalid loan types (must be 'fixed' or 'adjustable')."""
    with pytest.raises(ValueError, match="Invalid loan type: variable."):
        Mortgage(id=13, credit_score=750, loan_amount=100000,
                 property_value=200000, annual_income=50000,
                 debt_amount=10000, loan_type="variable", property_type="single_family")


def test_invalid_property_type():
    """Test handling of invalid property types (must be 'single_family' or 'condo')."""
    with pytest.raises(ValueError, match="Invalid property type: townhouse."):
        Mortgage(id=14, credit_score=750, loan_amount=100000,
                 property_value=200000, annual_income=50000,
                 debt_amount=10000, loan_type="fixed", property_type="townhouse")