from sqlalchemy import Column, Integer, String
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('mysql://user:pwd@localhost/college', echo=True)

Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class Listings(Base):
   __tablename__ = 'listings'

   id = Column(Integer, primary_key=True)
   name = Column(String)
   price = Column(String)
   image = Column(String)
   quantity = Column(Integer)
   type = Column(String)
   
class Listingsdet(Listings):
   def __init__(self,name=None,price=None,image=None, quantity=None, type=None):
      self.name=name
      self.price=price
      self.image=image
      self.quantity=quantity
      self.type=type
   
   def insert(self):
      try:
         Base.metadata.create_all(engine)
         a = Listings(name=self.name,price=self.price,image=self.image,quantity=self.quantity,type=self.type)
         session.add(a)
         session.commit()
         return self.display()
      except Exception as e:
         print(e)
         return 0
   
   def edit(self,pname):
      try:
         result = session.query(Listings).filter(Listings.id == pname).update({Listings.price: self.price,Listings.quantity: self.quantity, Listings.type: self.type}, synchronize_session = False)
         session.commit()
         return 'Edited'
      except Exception as e:
         print(e)
         return 0

   def delete(self,id):
      try:
         delete = session.query(Listings).get(id)
         session.delete(delete)
         session.commit()
         return 'deleted'
      except Exception as e:
         print(e)
         return 0

   def display(self):
      try:
         dis=session.query(Listings).all()
         l=[]
         for i in dis:
            l.append({"id": i.id, "title": i.name, "price": int(i.price), "image": i.image, 'quantity':i.quantity, "type": i.type})
         return l
      except Exception as e:
         print(e)
         return 0
