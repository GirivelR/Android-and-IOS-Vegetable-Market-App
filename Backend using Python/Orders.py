from sqlalchemy import Column, Integer, String
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('mysql://user:pwd@localhost/college', echo=True)

Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class Orders(Base):
   __tablename__ = 'orders'
   id = Column(Integer, primary_key=True)
   product_id = Column(String)
   title = Column(String)
   price = Column(String)
   count = Column(Integer)
   image = Column(String)
   email = Column(String)
   Order_date = Column(String)
   Order_time = Column(String)
   quantity = Column(Integer)
   type = Column(String)
   
class Ordersdet(Orders):
   def __init__(self,product_id=None,title=None,price=None,count=None,image=None,email=None,Order_date=None,Order_time=None,quantity=None,type=None):
      self.product_id=product_id
      self.title=title
      self.price=price
      self.count=count
      self.image=image
      self.email=email
      self.Order_date=Order_date
      self.Order_time=Order_time
      self.quantity=quantity
      self.type=type
   
   def insert(self):
      try:
         Base.metadata.create_all(engine)
         a = Orders(product_id=self.product_id,title=self.title,price=self.price,count=self.count,image=self.image,email=self.email,Order_date=self.Order_date,Order_time=self.Order_time,quantity=self.quantity,type=self.type)
         session.add(a)
         session.commit()
         return self.display()
      except Exception as e:
         print(e)
         return 0
   
   def delete(self):
      try:
         delete = session.query(Orders).get(self.product_id)
         session.delete(delete)
         session.commit()
         return 1
      except Exception as e:
         print(e)
         return 0

   def deleteorder(self,pid):
      try:
         delete = session.query(Orders).get(pid)
         session.delete(delete)
         session.commit()
         return 1
      except Exception as e:
         print(e)
         return 0
         
   def display(self):
      try:
         print(self.Order_date)
         dic = {'Jan':1,'Feb':2,'Mar':3,'Apr':4,'May':5,'Jun':6,'Jul':7,'Aug':8,'Sep':9,'Oct':10,'Nov':11,'Dec':12}
         if (self.Order_date!=None and self.email=="kilocart2020@gmail.com"):
            dis = session.query(Orders).filter(Orders.Order_date == self.Order_date).all()
            l=[]
            if self.email=="kilocart2020@gmail.com":
               for i in dis:
                  l.append({"id": i.id, "Prodect id": i.product_id, "title": i.title, "price": i.price, "count":i.count, "total":int(i.price)*int(i.count), "image": i.image, "email":i.email, "date":i.Order_date, "datedel":i.Order_date, "time": i.Order_time,"quantity":i.quantity, "type": i.type})
            else:
               for i in dis:
                  print(self.email,self.Order_date,i.Order_date)
                  if i.email==self.email:
                     l.append({"id": i.id, "Prodect id": i.product_id, "title": i.title, "price": i.price, "count":i.count, "total":int(i.price)*int(i.count), "image": i.image, "email":i.email, "date":i.Order_date, "datedel":i.Order_date, "time": i.Order_time,"quantity":i.quantity, "type": i.type})
         else:
            dis=session.query(Orders).all()
            l=[]
            if self.email=="kilocart2020@gmail.com":
               for i in dis:
                  l.append({"id": i.id, "Prodect id": i.product_id, "title": i.title, "price": i.price, "count":i.count, "total":int(i.price)*int(i.count), "image": i.image, "email":i.email, "date":i.Order_date, "datedel":i.Order_date, "time": i.Order_time,"quantity":i.quantity, "type": i.type})
            else:
               for i in dis:
                  if i.email==self.email:
                     print(self.email,self.Order_date,i.Order_date)
                     l.append({"id": i.id, "Prodect id": i.product_id, "title": i.title, "price": i.price, "count":i.count, "total":int(i.price)*int(i.count), "image": i.image, "email":i.email, "date":i.Order_date, "datedel":i.Order_date, "time": i.Order_time,"quantity":i.quantity, "type": i.type})
         print(l)
         return list(reversed(l))
      except Exception as e:
         print(e)
         return None
      else:
         return None
