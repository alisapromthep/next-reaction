/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mh0g1lkr8l9h9ym")

  // remove
  collection.schema.removeField("rf96ofuw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fevb7dnt",
    "name": "user_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mh0g1lkr8l9h9ym")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rf96ofuw",
    "name": "user_id",
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

  // remove
  collection.schema.removeField("fevb7dnt")

  return dao.saveCollection(collection)
})
