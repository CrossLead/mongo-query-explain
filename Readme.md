# mongo-explain-match

WORK IN PROGRESS -- API / features still rapidly changing...

[![npm version](https://badge.fury.io/js/mongo-explain-match.svg)](https://badge.fury.io/js/mongo-explain-match)
[![Build Status](https://travis-ci.org/CrossLead/mongo-explain-match.svg?branch=master)](https://travis-ci.org/CrossLead/mongo-explain-match)

Utility library for explaining why a mongodb document matches a mongodb query.

## Example

```typescript
import { match } from 'mongo-explain-match';

const doc = {
  id: 1
};

const result = match({ id: { $in: [2, 3] } }, doc);

console.log(result);
// {
//   "match": true,
//   "reasons": [
//     {
//       "propertyPath": "id",
//       "queryPath": "id.$in",
//       "type": "IN_SET"
//     }
//   ]
// }

/**
 * can also only provide query to get curried matching function
 */
const docs = [
  { id: 1, name: 'Amanda' },
  { id: 2, name: 'Ben' },
  { id: 3, name: 'Chris' }
];

const filtered = docs.filter(
  match({
    $or: [{ name: /A/ }, { id: 2 }]
  })
);
// filtered === [
//   { id: 1, name: 'Amanda' },
//   { id: 2, name: 'Ben' },
// ];
```

## Implemented query operators

* [x] `$and`
* [x] `$or`
* [x] `$not`
* [x] `$nin`
* [x] `$in`
* [x] `$eq`
* [x] `$ne`
* [x] `$gt`
* [x] `$gte`
* [x] `$lt`
* [x] `$lte`
* [x] `$elemMatch`
* [ ] `$regex` (No support -- would require Perl compatible regular expressions, [can use `{ field: /pattern/}` syntax instead](https://docs.mongodb.com/manual/reference/operator/query/regex/#syntax-restrictions))
