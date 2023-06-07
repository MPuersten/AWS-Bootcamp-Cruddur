import os
import sys

from flask import Flask
from flask import request, g

from lib.rollbar import init_rollbar
from lib.xray import init_xray
from lib.honeycomb import init_honeycomb
from lib.cors import init_cors
from lib.cognito_jwt_token import jwt_required
from lib.cloudwatch import init_cloudwatch

import routes.activities
import routes.general
import routes.messages
import routes.users

app = Flask(__name__)
routes.activities.load(app)
routes.general.load(app)
routes.messages.load(app)
routes.users.load(app)

init_xray(app)
init_honeycomb(app)
init_cors(app)
with app.app_context():
  g.rollbar = init_rollbar(app)

if __name__ == "__main__":
  app.run(debug=True)