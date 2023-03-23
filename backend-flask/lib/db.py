from psycopg_pool import ConnectionPool
import os

class Db:
  def __init__(self):
    self.init_pool()
  
  def init_pool(self):
    connection_url = os.getenv("CONNECTION_URL")
    self.pool = ConnectionPool(connection_url)

  def query_commit_id(self, sql, *kwargs):
    print("SQL statement (commit with returning id) ---------------")
    try:
      conn = self.pool.connection()
      curr = conn.cursor()
      cur.execute(sql, kwargs)
      returning_id = cur.fetchone()[0]
      conn.commit()
      return returning_id
    except Exception as err:
      print_sql_err(err)
      # conn.rollback()

  def query_commit(self, sql):
    print("SQL statement (commit) ---------------")
    try:
      conn = self.pool.connection()
      curr = conn.cursor()
      cur.execute(sql)
      conn.commit()
    except Exception as err:
      print_sql_err(err)
      # conn.rollback()

  def query_object_json(self, sql):
    print("SQL statement (obj) ---------------")
    print(sql + "\n")
    wrapped_sql = self.query_wrap_object(sql)
    with self.pool.connection() as conn:
      with conn.cursor() as cur:
        cur.execute(wrapped_sql)
        json = cur.fetchone()
        return json[0]

  def query_array_json(self, sql):
    print("SQL statement (array)---------------")
    print(sql + "\n")
    wrapped_sql = self.query_wrap_array(sql)
    with self.pool.connection() as conn:
      with conn.cursor() as cur:
        cur.execute(wrapped_sql)
        json = cur.fetchone()
        return json[0]

  def query_wrap_object(self, template):
    sql = f"""
    (SELECT COALESCE(row_to_json(object_row),'{{}}'::json) FROM (
    {template}
    ) object_row);
    """
    return sql

  def query_wrap_array(self, template):
    sql = f"""
    (SELECT COALESCE(array_to_json(array_agg(row_to_json(array_row))),'[]'::json) FROM (
    {template}
    ) array_row);
    """
    return sql

  def print_sql_err(self, err):
    err_type, err_obj, traceback = sys.exc_info()
    line_num = traceback.tb_lineno

db = Db()