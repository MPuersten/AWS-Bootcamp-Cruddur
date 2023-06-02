from flask import got_request_exception
from time import strftime
import os
import rollbar
import rollbar.contrib.flask

def init_rollbar(app):
  rollbar_access_token = os.getenv('ROLLBAR_ACCESS_TOKEN')
  rollbar.init(
      rollbar_access_token,
      # env name
      'production',
      # for traceback
      root=os.path.dirname(os.path.realpath(__file__)),
      allow_logging_basic_config=False)
  # pipe exceptions from application to rollbar via signal
  got_request_exception.connect(rollbar.contrib.flask.report_exception, app)
  return rollbar