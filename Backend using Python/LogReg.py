from sqlalchemy import Column, Integer, String
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from Security import *

engine = create_engine('mysql://giri:techotron20@kilocart20.cjjypqa5zqp1.ap-south-1.rds.amazonaws.com:3306/kilocart', echo=True)

Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class Register(Base):
   __tablename__ = 'register'

   id = Column(Integer, primary_key=True)
   name = Column(String)
   email = Column(String)
   phone = Column(String)
   password = Column(String)
   shopaddress = Column(String)
   image = Column(String)
   
class Registerdet(Register):
   def __init__(self,name=None,email=None,phone=None,password=None,address=None,image=None):
      self.name=name
      self.email=email
      self.phone=phone
      self.password=password
      self.address=address
      self.image=image
   
   def insert(self):
      try:
         email=''
         Base.metadata.create_all(engine)
         result = session.query(Register).filter(Register.email == self.email)
         for i in result:
            if i.email!=None:
               email=i.email
               return 0
         a = Register(name=self.name, email=self.email, phone=self.phone, password=self.password, shopaddress=self.address,image=self.image)
         session.add(a)
         session.commit()
         return 1
      except Exception as e:
         print(e)
         return 0
   
   def login(self):
      try:
         result = session.query(Register).filter(Register.email == self.email, Register.password == self.password)
         secode = Securitydet(email=self.email).verification()
         for i in result:
            if secode==0:
               self.delete(i.id)
               return 0
            if i.name and secode==1:
               return i.email
         return 0
      except Exception as e:
         print(e)
         return 0  

   def delete(self,uid):
      try:
         delete = session.query(Register).get(uid)
         session.delete(delete)
         session.commit()
         return 'deleted'
      except Exception as e:
         print(e)
         return 0
   
   def newpassword(self):
      try:
         result = session.query(Register).filter(Register.email == self.email).update({Register.password: self.password})
         session.commit()
      except Exception as e:
         print(e)
         return 0

   def account(self):
      try:
         result = session.query(Register).filter(Register.email == self.email)
         for i in result:
            return {'name':i.name, 'image':i.image}
         return 0
      except Exception as e:
         print(e)
         return 0

   def display(self):
      try:
         dis=session.query(Register).filter(Register.email == self.email).all()
         l=[]
         for i in dis:
            if str(self.email)==str(i.email):
               l.append({'name': i.name, 'phone': i.phone, 'address': i.shopaddress})
         return l
      except Exception as e:
         print(e)
         return 0

