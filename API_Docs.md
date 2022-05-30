# API documentation

## CARS
Responsible for funtioning of data analyzer.

**URL** : 
```url
/cars/{manufacturer}/{fuelType}/{transmission}/{orderBy}/{year}/{mileageKML}/{engineCC}/{power}/{seats}/{price}/{numberOfRecords}/
```

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**Data constraints** : `{}`

## Success Responses

**Condition** : No records found.

**Code** : `200 OK`

**Content** : `{[]}`

### OR

**Condition** : records found.
#### Example
```
/cars/Maruti/Petrol/Automatic/Price/2018/0/0/0/0/5/1/
```
**Code** : `200 OK`

**Content** :

```json
[
    {
  "Unnamed: 0.1": 428,
  "Unnamed: 0": 431,
  "Name": "Maruti Baleno Alpha Automatic",
  "Manufacturer": "Maruti",
  "Location": "Coimbatore",
  "Year": 2018,
  "Kilometers_Driven": 12831,
  "Fuel_Type": "Petrol",
  "Transmission": "Automatic",
  "Owner_Type": "First",
  "Engine CC": 1197,
  "Power": 83.1,
  "Seats": 5,
  "Mileage Km/L": 21.4,
  "Price": 9.89,
  "AverageYearlySales": 498280
}
]
```