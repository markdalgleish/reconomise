reconomise
==========

Crowd sourced local business support network and priority ranking system

Getting Started
===============

Install Node.js first.


Then install all the dependencies:

`npm install`


Then add your Sensis API Key:
- Copy `server-config-example.js` and rename it to `server-config.js`
- Replace the placeholder key with your API key. Ask me if you don't have one :)
- Add the MongoDB username and password. Again, ask me if you need it :)


Run the server:

`node server.js`


View the site at http://localhost:3000


Example "Business" JSON
=======================

```
{
    "business_id": 12193709,
    "sensis_data": {
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
    "needs": [
		{
			"type": "Generators",
            "comments": "I need a generator to keep my food from spoiling",
            "urgency": 6
        },
        {
            "type": "Petrol",
			"comments": "I need petrol for the generator, if possible",
            "urgency": 6
        }
    ],
    "offers": [
        {
			"type": "Labour",
            "comments": "I have 20 staff who can help with disaster recovery",
            "availability": "Business hours"
        },
        {
			"type": "Outdoor Space",
            "comments": "I have a large car park which can be used for temporary storage",
            "availability": "As long as this disaster lasts"
        }
    ]
}
```