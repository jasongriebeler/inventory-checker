# inventory-checker

## Prereqs
1. NodeJS v18+
2. Postman

## Instructions
1. Within the index.js file, there's a variable called `itenNos` which contains the item numbers to be looked up.
2. run `node src/index.js`
3. see fancy table
    ```
   ┌─────────┬─────────────────┬────────────┬─────────────┬──────────────────────────────────┐
   │ (index) │   messageType   │   itemNo   │ productName │           productType            │
   ├─────────┼─────────────────┼────────────┼─────────────┼──────────────────────────────────┤
   │    0    │ 'HIGH_IN_STOCK' │ '60265460' │  'SEKTION'  │       'wall cabinet frame'       │
   │    1    │ 'HIGH_IN_STOCK' │ '20265513' │  'SEKTION'  │     'wall top cabinet frame'     │
   │    2    │ 'HIGH_IN_STOCK' │ '60284581' │  'SEKTION'  │ 'reinforced ventilated top rail' │
   │    3    │ 'HIGH_IN_STOCK' │ '10265523' │  'UTRUSTA'  │             'shelf'              │
   │    4    │ 'OUT_OF_STOCK'  │ '30265466' │  'SEKTION'  │       'wall cabinet frame'       │
   │    5    │ 'HIGH_IN_STOCK' │ '30265386' │  'SEKTION'  │       'base cabinet frame'       │
   │    6    │ 'OUT_OF_STOCK'  │ '60435599' │  'BODARP'   │          'cover panel'           │
   │    7    │ 'HIGH_IN_STOCK' │ '80265398' │  'SEKTION'  │       'base cabinet frame'       │
   │    8    │ 'HIGH_IN_STOCK' │ '00265509' │  'SEKTION'  │     'wall top cabinet frame'     │
   │    9    │ 'HIGH_IN_STOCK' │ '40265456' │  'SEKTION'  │       'wall cabinet frame'       │
   │   10    │ 'HIGH_IN_STOCK' │ '50265470' │  'SEKTION'  │       'wall cabinet frame'       │
   └─────────┴─────────────────┴────────────┴─────────────┴──────────────────────────────────┘
    ```

## Organization
* src
  * folder for all javascript files to be executed during the script
* postman
  * folder for a RESTful API collection for postman, not used during script execution
* package.json
  * a framework specific file for node.js that helps install other libraries or consolidate instructions for executing scripts. Not required for this script, technically.
* .gitignore
  * a special file for source control, contains markup that tells git to ignore certain files/folders that you'd never want stored/shared.
   
## Algorithm
For Each Item Number
1. Query for product detail
2. Query for availability
3. Take the two results and map the data we want onto a new object 
4. Add the new object to the result list

After each item number has been queried, print the list in a fancy table