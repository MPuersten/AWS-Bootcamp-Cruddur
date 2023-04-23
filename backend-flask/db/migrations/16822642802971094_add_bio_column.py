from lib.db import db

class AddBioColumnMigration(Migration):
  def migrate_sql():
    data = """
    ALTER TABLE public.users ADD COLUMN bio text;
    """
    return data
  def rollback_sql():
    data = """
    ALTER TABLE public.users DROP COLUMN;
    """
    return data
  def migrate():
    this.query_commit(AddBioColumnMigration.migrate_sql(),{
    })
  def rollback():
    this.query_commit(AddBioColumnMigration.rollback_sql(),{
    })

migration = AddBioColumnMigration