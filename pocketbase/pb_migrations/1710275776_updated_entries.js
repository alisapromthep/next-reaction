/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mh0g1lkr8l9h9ym")

  collection.createRule = "@request.headers.token != \"\""
  collection.updateRule = ""
  collection.deleteRule = "@request.headers.token != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mh0g1lkr8l9h9ym")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
