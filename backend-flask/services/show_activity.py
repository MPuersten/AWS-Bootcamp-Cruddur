from datetime import datetime, timedelta, timezone
class ShowActivities:
  def run(activity_uuid):
    now = datetime.now(timezone.utc).astimezone()
    sql = db.template('activities', 'show')
    results = db.query_array_json(sql, {
      'uuid': activity_uuid
    })
    return results