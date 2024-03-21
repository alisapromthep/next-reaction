/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mh0g1lkr8l9h9ym")

  // remove
  collection.schema.removeField("pxbyaozr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bkrkjkw4",
    "name": "time_of_day",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mh0g1lkr8l9h9ym")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pxbyaozr",
    "name": "time_of_day",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("bkrkjkw4")

  return dao.saveCollection(collection)
})
