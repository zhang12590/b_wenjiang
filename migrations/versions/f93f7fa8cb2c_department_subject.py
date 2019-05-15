"""department-subject

Revision ID: f93f7fa8cb2c
Revises: 34d353e9e825
Create Date: 2019-05-10 15:08:46.220952

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'f93f7fa8cb2c'
down_revision = '34d353e9e825'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('department', sa.Column('subjects', sa.String(length=128), nullable=True))
    op.add_column('user', sa.Column('department', sa.String(length=128), nullable=True))
    op.drop_column('user', 'subject')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('subject', mysql.VARCHAR(length=128), nullable=True))
    op.drop_column('user', 'department')
    op.drop_column('department', 'subjects')
    # ### end Alembic commands ###