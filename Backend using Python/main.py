import time
import random
import smtplib
import base64
import smtplib,ssl
import datetime,pytz
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from flask import *
from LogReg import *
from Listings import *
from Security import *
from Orders import *
from Toggle import *

emailfor=email=''
secode=str(random.randrange(100000,999999))
reg=0
tog=''

def sendorderuser(receiver_email,res,time):
    print('user',receiver_email)
    try:
        smtp_ssl_host = 'smtp.gmail.com'  # smtp.mail.yahoo.com
        smtp_ssl_port = 465
        username = 'kilocart20@gmail.com '
        password = 'Kilocart@20'
        sender = username
        targets = receiver_email
        msg = MIMEText('Hi,Your Orders :\n {}'.format(str(res)))        
        msg['Subject'] = 'Your Order details at {}'.format(str(time))
        msg['From'] = sender
        msg['To'] = targets
        print('user',receiver_email)
        server = smtplib.SMTP_SSL(smtp_ssl_host, smtp_ssl_port)
        server.login(username,password)
        server.sendmail(sender,targets,msg.as_string())
        server.quit()
    except Exception as e:
        print(e)
def sendorderadmin(res,user,time):
    try:
        smtp_ssl_host = 'smtp.gmail.com'  # smtp.mail.yahoo.com
        smtp_ssl_port = 465
        username = 'kilocart20@gmail.com '
        password = 'Kilocart@20'
        sender = 'kilocart20@gmail.com '
        targets = sender
        msg = MIMEText('Hi,Order details : {}'.format(str(res) + str(user)))        
        msg['Subject'] = 'Your got an Order at {}'.format(str(time))
        msg['From'] = sender
        msg['To'] = targets
        server = smtplib.SMTP_SSL(smtp_ssl_host, smtp_ssl_port)
        server.login(username,password)
        server.sendmail(sender,targets,msg.as_string())
        server.quit()
    except Exception as e:
        print(e)

def sendadmin(res):
    try:
        smtp_ssl_host = 'smtp.gmail.com'  # smtp.mail.yahoo.com
        smtp_ssl_port = 465
        username = 'kilocart20@gmail.com '
        password = 'Kilocart@20'
        sender = 'kilocart20@gmail.com '
        targets = sender
        msg = MIMEText('Hi,you got new registration : {}'.format(str(res)))         
        msg['Subject'] = 'Registration details'
        msg['From'] = sender
        msg['To'] = targets

        server = smtplib.SMTP_SSL(smtp_ssl_host, smtp_ssl_port)
        server.login(username,password)
        server.sendmail(sender,targets,msg.as_string())
        server.quit()
    except Exception as e:
        print(e)
def send(receiver_email,code,message=None):
    try:
        smtp_ssl_host = 'smtp.gmail.com'  # smtp.mail.yahoo.com
        smtp_ssl_port = 465
        username = 'kilocart20@gmail.com '
        password = 'Kilocart@20'
        sender = 'kilocart20@gmail.com '
        targets = receiver_email
        if message:
            msg = MIMEText('Hi,{} : {}'.format(code, message))
        else:
            msg = MIMEText('Hi,Your secret code : {}'.format(code))
        msg['Subject'] = 'Reference code'
        msg['From'] = sender
        msg['To'] = targets

        server = smtplib.SMTP_SSL(smtp_ssl_host, smtp_ssl_port)
        server.login(username,password)
        server.sendmail(sender,targets,msg.as_string())
        server.quit()
    except Exception as e:
        print(e)

def randnum():
    secode=str(random.randrange(100000,999999))
    return secode

#function to save image
def save_image(name,imgstring):
    imgdata = base64.b64decode(imgstring)
    filename = "/home/ec2-user/kilocart/assets/"+name+".jpg"
    with open(filename, 'wb') as f:
        f.write(imgdata)
    return name
    
#function to get image as uri
def convert_image(path):
    path = "/home/ec2-user/kilocart/assets/"+path+".jpg"
    with open(path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
    return "data:image/jpg;base64,"+str(encoded_string)[2:-1]

app = Flask(__name__)

@app.route('/account',methods=['POST'])
def account():
    if request.method=="POST":
        res=request.json
        print(res)
        status=Registerdet(email=res['details']).account()
        print(type(status))
        if status!=0:
            image = convert_image(status['image'])
        else:
            image=convert_image('banana')
        if status:
            return {'name': status['name'],"image":image}
        return {'sta':"Email Id already exits","image":"Sorry"}

@app.route('/register',methods=['POST'])
def registeration():
    if request.method=="POST":
        res=request.json
        image = save_image(res['details']['name'],str(res['details']['images'][0][0]))
        status=Registerdet(name=res['details']['name'], email=res['details']['email'], phone=res['details']['phone'], password=res['details']['password'], address=res['details']['shopaddress'],image=image).insert()
        if status:
            temp = res['details']
            temp['image']=None
            userdata ="\nName: {}\nPhone: {}\nEmail: {}\nAddress: {}\n".format(temp['name'],temp['phone'],temp['email'],temp['shopaddress'])
            sendadmin(userdata)
            global reg
            reg=1
            return {'sta': "Registed successfully","email":res['details']['email']}
        return {'sta':"Email Id already exits","email":status}

@app.route('/login',methods=['POST'])
def login():
    if request.method=="POST":
        res=request.json
        print(res)
        if res['details']['email']=="kilocart20@gmail.com" and res['details']['password']=='adminpassword':
            return {'sta':'admin'}
        status=Registerdet(email=res['details']['email'],password=res['details']['password']).login()
        if status:
            return {'sta':status}
        return {'sta':"Invalid user name or password"}

@app.route('/listings',methods=['POST'])
def listings():
    if request.method=="POST":
        res=request.json
        print(res)
        status=Listingsdet.display(None)
        print(status)
        for i in status:
            i['image']=convert_image(i['image'])
        if status:
            return {'sta':status, 'toggle': Toggledet.check(None)}
        return {'sta':"No items available"}

@app.route('/additem',methods=['POST'])
def additem():
    if request.method=="POST":
        res=request.json
        image = save_image(res['details']['name'],res['details']['images'][0][0])
        status=Listingsdet(name=res['details']['name'],price=int(res['details']['price']),quantity=res['details']['quantity'],image=image,type=res['details']['type']).insert()
        if status:
            return {"sta": 'Item added'}
        return {"sta": 'Item not added'}

@app.route('/edititem',methods=['POST'])
def edititem():
    if request.method=="POST":
        res=request.json
        print(res)
        print(res['pdetails'])
        status=Listingsdet(price=int(res['details']['price']),quantity=res['details']['quantity'],type=res['details']['type']).edit(res['pdetails'])
        if status:
            return {'sta':status}
        return {'sta':"No items available"}

@app.route('/delete',methods=['POST'])
def delete():
    if request.method=="POST":
        res=request.json
        status = Listingsdet.delete(None,id=res['details']['id'])
    return {'sta': 1}

@app.route('/securitycodecheck',methods=['POST'])
def checkcode():
    if request.method=="POST":
        res=request.json
        code = res['details']['security']
        email = res['email']
        secode = int(Securitydet(email=email).check())
        print(email,code,secode)
        global reg
        if str(code)==str(secode):
            if reg:
                send(email,'You have been Registered successfully...','Thank you!')
            Securitydet(email=email,verify=1).update()
            reg=0
            return {'sta':email}
        return {'sta':"Invalid security code"}

@app.route('/forgotpassword',methods=['POST'])
def forgotpassword():
    if request.method=="POST":
        res=request.json
        secode=randnum()
        emailfor = str(res['details']['email'])
        status=Securitydet(email=emailfor,code=secode).insert()
        send(emailfor,"Your reference code: ",str(secode))
        return {'sta':emailfor}
    return {'sta':emailfor}

@app.route('/newpassword',methods=['POST'])
def newpassword():
    if request.method=="POST":
        res=request.json
        print(res)
        email = res['email']
        new = res['details']['new']
        confirm = res['details']['confirm']
        print(new,email,confirm)
        if new==confirm:
            status = Registerdet(email=email,password=new).newpassword()
            send(email,'Your password have been changed successfully...','Thank you!')
            return {'sta':email}
        return {'sta':"Password does't match"}

@app.route('/order',methods=['POST'])
def order():
    if request.method=="POST":
        res=request.json
        now=datetime.datetime.now(pytz.timezone('Asia/Kolkata'))
        orderdate = datetemp = now.strftime("%d-%m-%Y")
        ordertime = now.strftime("%H:%M:%S")
        print(orderdate)
        l = datetemp.split("-")
        l[0]=str(int(l[0]))
        l[1]=str(int(l[1]))
        orderdate = '-'.join(l)
        print("date",orderdate,ordertime)
        for i in res['details']:
            status = Ordersdet(product_id=i['id'],title=i['title'],image=i['title'],price=i['price'],count=i['count'],email=res['email'],Order_date=orderdate,Order_time=ordertime,quantity=i['quantity'],type=i['type']).insert()
        user = Registerdet(email= res['email']).display()
        if status:
            temp = res
            mesg = ''
            for i in res['details']:
                i['image']=None
                mesg +="\nTitle: {}\nPrice: {}\nCount: {}\nTotal Price: {}\nTotal quantity: {}\n".format(i['title'],i['price'],i['count'],int(i['price'])*int(i['count']),int(i['quantity'])*int(i['count']))
            userdata ="\nUser who ordered \nName: {}\nPhone: {}\nAddress: {}\n".format(user[0]['name'],user[0]['phone'],user[0]['address'])
            sendorderuser(str(res['email']),mesg,orderdate+" "+ordertime)
            sendorderadmin(mesg,userdata,orderdate+" "+ordertime)
            return {'sta': 1}
        return {'sta': 0}

@app.route('/orderdis',methods=['POST'])
def orderdis():
    try:
        if request.method=="POST":
            res=request.json
            print(res['datetime'])
            order = Ordersdet(email=res['details'],Order_date=res['datetime']).display()
            print(order)
            for i in order:
                print(i['email'])
                user = Registerdet(email= i['email']).display()
                i['image']=convert_image(i['image'])
                try:
                    i.update(user[0])
                except Exception:
                    order = "Error occured"
                    
            return {'sta': order}
    except Exception as e:
        print(e)
        return {'sta': 'error occured'}

@app.route('/userdet',methods=['POST'])
def userdis():
    if request.method=="POST":
        res=request.json
        return {'sta': res}
    
@app.route('/orderdet',methods=['POST'])
def orderdet():
    if request.method=="POST":
        res=request.json
        print(res['details'])
        now=datetime.datetime.now(pytz.timezone('Asia/Kolkata'))
        date=now.strftime("%d-%m-%Y")
        l = date.split("-")
        l[0]=str(int(l[0]))
        l[1]=str(int(l[1]))
        date = '-'.join(l)
        try:
            for i in res['details']:
                print(date,i['date'],i['id'])
                if date == i['date']:
                    delete = Ordersdet.deleteorder(None,pid=i['id'])
        except Exception as e:
            print(e)
            return {'sta': 0}
        return {'sta': 1}

@app.route('/toggle',methods=['POST'])
def toggle():
    if request.method=="POST":
        res=request.json
        tog = res['details']['toggle']
        Toggledet(toggle = tog).update()
        return {'sta': tog}
    
if __name__ == "__main__":
    app.run(host= "0.0.0.0", port=8080,debug=True)
#ec2-13-233-149-39.ap-south-1.compute.amazonaws.com
