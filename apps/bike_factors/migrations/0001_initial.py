# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-11 18:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BikeOption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option', models.CharField(max_length=150)),
                ('price_factor', models.DecimalField(decimal_places=2, max_digits=3)),
            ],
            options={
                'ordering': ['option'],
            },
        ),
        migrations.CreateModel(
            name='BrandOption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option', models.CharField(max_length=150)),
                ('price_factor', models.DecimalField(decimal_places=2, max_digits=3)),
                ('requisites', models.ManyToManyField(to='bike_factors.BikeOption', verbose_name='Select bike types that this feature is avalable for')),
            ],
            options={
                'ordering': ['option'],
            },
        ),
        migrations.CreateModel(
            name='CosmeticOption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option', models.CharField(max_length=150)),
                ('price_factor', models.DecimalField(decimal_places=2, max_digits=3)),
                ('requisites', models.ManyToManyField(to='bike_factors.BikeOption', verbose_name='Select bike types that this feature is avalable for')),
            ],
            options={
                'ordering': ['option'],
            },
        ),
        migrations.CreateModel(
            name='FeaturesOption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option', models.CharField(max_length=150)),
                ('price_factor', models.DecimalField(decimal_places=2, max_digits=3)),
                ('requisites', models.ManyToManyField(to='bike_factors.BikeOption', verbose_name='Select bike types that this feature is avalable for')),
            ],
            options={
                'ordering': ['option'],
            },
        ),
        migrations.CreateModel(
            name='FrameOption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option', models.CharField(max_length=150)),
                ('price_factor', models.DecimalField(decimal_places=2, max_digits=3)),
                ('requisites', models.ManyToManyField(to='bike_factors.BikeOption', verbose_name='Select bike types that this feature is avalable for')),
            ],
            options={
                'ordering': ['option'],
            },
        ),
        migrations.CreateModel(
            name='WheelOption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option', models.CharField(max_length=150)),
                ('price_factor', models.DecimalField(decimal_places=2, max_digits=3)),
                ('requisites', models.ManyToManyField(to='bike_factors.BikeOption', verbose_name='Select bike types that this feature is avalable for')),
            ],
            options={
                'ordering': ['option'],
            },
        ),
    ]
