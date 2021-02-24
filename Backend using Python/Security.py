from sqlalchemy import Column, Integer, String
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('mysql://giri:techotron20@kilocart20.cjjypqa5zqp1.ap-south-1.rds.amazonaws.com:3306/kilocart', echo=True)

Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class Security(Base):
   __tablename__ = 'security'

   id = Column(Integer, primary_key=True)
   email = Column(String)
   code = Column(String)
   verify = Column(Integer)
   
class Securitydet(Security):
   def __init__(self,email=None,code=None,verify=None):
      self.email=email
      self.code=code
      self.verify=verify
   
   def insert(self):
      try:
         f=1
         Base.metadata.create_all(engine)
         status = session.query(Security).filter(Security.email == self.email).all()
         for i in status:
            if i.email == self.email:
               i.code=self.code
               i.verify = 0
               f=0
               break
         if f:
            a = Security(email=self.email, code=self.code, verify=self.verify)
            session.add(a)
         session.commit()
         return 1
      except Exception as e:
         print(e)
         return 0
   
   def check(self):
      try:
         result = session.query(Security).filter(Security.email == self.email)
         for i in result:
            if i.email and (i.verify==0 or i.verify==None):
               return i.code
         return 0
      except Exception as e:
         print(e)
         return 0
   
   def verification(self):
      try:
         result = session.query(Security).filter(Security.email == self.email)
         for i in result:
               return i.verify
      except Exception as e:
         print(e)
         return 0

   def update(self):
      try:
         result = session.query(Security).filter(Security.email == self.email).update({Security.verify: self.verify}, synchronize_session = False)
         session.commit()
         return 'Edited'
      except Exception as e:
         print(e)
         return 0
   

