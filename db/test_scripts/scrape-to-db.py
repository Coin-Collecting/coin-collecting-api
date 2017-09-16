#!/usr/bin/python
import peewee
from peewee import *

db = MySQLDatabase('test_db', user='root', passwd='DodgerJuno21')

class Book(peewee.Model):
    author = peewee.CharField()
    title = peewee.TextField()

    class Meta:
        database = db

Book.create_table()
book = Book(author="me", title='Peewee is cool')
book.save()
for book in Book.filter(author="me"):
    print book.title