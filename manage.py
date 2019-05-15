from app import create_app, db
from flask_script import Manager, Shell
from flask_migrate import Migrate, MigrateCommand
from app.models import Subject, Item, Review, Addr, User, Role, Business, BusinessStatus, People, Step, Msg

# 创建flask应用对象
app = create_app("develop")
Migrate(app, db)
manager = Manager(app)


def make_shell_context():
    return dict(app=app, db=db, Subject=Subject, Item=Item, Review=Review, Addr=Addr,
                User=User, Role=Role, Step=Step, Msg=Msg,
                Business=Business, BusinessStatus=BusinessStatus, People=People)


manager.add_command("db", MigrateCommand)
manager.add_command("shell", Shell(make_context=make_shell_context))

if __name__ == '__main__':
    manager.run()
