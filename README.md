reconomise
==========

Crowd sourced local business support network and priority ranking system

Example "Business" JSON
=======================

```
{
    business_id: 12193709,
    sensis_data: {
        "name": "Compliance & Risk Services Pty Ltd",
        "id": "12193709",
        "categories": [
            {
                "name": "Risk Management Consultants",
                "id": "43672",
                "sensitive": false
            }
        ],
        "primaryAddress": {
            "state": "VIC",
            "type": "PHYSICAL",
            "suburb": "Melbourne",
            "postcode": "3000",
            "latitude": "-37.8146",
            "longitude": "144.97131",
            "addressLine": "Lvl 9/ 63 Exhibition St",
            "geoCodeGranularity": "PROPERTY"
        },
        "primaryContacts": [
            {
                "value": "(03) 9663 5644",
                "type": "PHONE"
            },
            {
                "value": "http://www.compliancerisk.com.au",
                "type": "URL"
            }
        ],
        "reportingId": "eyJzb3VyY2UiOiJZRUxMT1ciLCJwcm9kdWN0SWQiOiI0ODE5MDY1ODkiLCJwcm9kdWN0VmVyc2lvbiI6IjEifQ",
        "detailsLink": "http://www.yellowpages.com.au/vic/melbourne/compliance-risk-services-pty-ltd-12193709-listing.html?referredBy=TAPI-usSp5M4X22Qs46DYnjMUTPIUGQiu-TEK",
        "listingType": "Business",
        "pureMobileBusiness": false,
        "hasExposureProducts": false
    },
    "needs": {
        456: { // ID of need
            "comments": "I need a generator to keep my food from spoiling",
            "urgency": 6
        },
        457: {
            "comments": "I need petrol for the generator, if possible",
            "urgency": 6
        }
    },
    "offers": {
        567: {
            "comments": "I have 20 staff who can help with disaster recovery",
            "availability": "Business hours"
        },
        568: {
            "comments": "I have a large car park which can be used for temporary storage",
            "availability": "As long as this disaster lasts"
        }
    }
}
```