/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mh0g1lkr8l9h9ym")

  collection.listRule = "@request.headers.token != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mh0g1lkr8l9h9ym")

  collection.listRule = null

  return dao.saveCollection(collection)
})
