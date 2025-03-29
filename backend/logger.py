import logging
import os
from dotenv import load_dotenv

load_dotenv()


LOG_FORMAT= os.getenv("LOG_FORMAT")
LOG_LEVEL = getattr(logging, os.getenv("LOG_LEVEL").upper()) 
logger = logging.getLogger("mortgage_logger")
logger.setLevel(LOG_LEVEL)

stream_handler = logging.StreamHandler()

formatter = logging.Formatter(LOG_FORMAT)
stream_handler.setFormatter(formatter)

logger.addHandler(stream_handler)
