/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solana_bootcamp_project.json`.
 */
export type SolanaBootcampProject = {
  "address": "2ib7Hs36VGCkK2jrQYhXQmoLo2NroovyfSZf4khDj2qq",
  "metadata": {
    "name": "solanaBootcampProject",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createEvent",
      "discriminator": [
        49,
        219,
        29,
        203,
        22,
        98,
        100,
        87
      ],
      "accounts": [
        {
          "name": "event",
          "writable": true,
          "signer": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "organizer",
          "type": "pubkey"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "date",
          "type": "i64"
        },
        {
          "name": "ticketQuantity",
          "type": "u32"
        },
        {
          "name": "ticketPrice",
          "type": "u64"
        },
        {
          "name": "ticketsMinted",
          "type": "u32"
        }
      ]
    },
    {
      "name": "getUserTickets",
      "discriminator": [
        39,
        51,
        254,
        11,
        52,
        189,
        11,
        169
      ],
      "accounts": [
        {
          "name": "user",
          "signer": true,
          "relations": [
            "ticketPurchase"
          ]
        },
        {
          "name": "event"
        },
        {
          "name": "ticketPurchase",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  105,
                  99,
                  107,
                  101,
                  116,
                  95,
                  112,
                  117,
                  114,
                  99,
                  104,
                  97,
                  115,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "event"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "purchaseTickets",
      "discriminator": [
        146,
        121,
        85,
        207,
        182,
        70,
        169,
        155
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "event",
          "writable": true
        },
        {
          "name": "ticketPurchase",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  105,
                  99,
                  107,
                  101,
                  116,
                  95,
                  112,
                  117,
                  114,
                  99,
                  104,
                  97,
                  115,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "event"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "quantity",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "eventContract",
      "discriminator": [
        137,
        13,
        134,
        204,
        99,
        7,
        205,
        34
      ]
    },
    {
      "name": "ticketPurchase",
      "discriminator": [
        222,
        22,
        3,
        148,
        12,
        69,
        58,
        40
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "exceedsMaxTickets",
      "msg": "Cannot purchase more than 5 tickets"
    },
    {
      "code": 6001,
      "name": "noTicketsAvailable",
      "msg": "No tickets available"
    },
    {
      "code": 6002,
      "name": "invalidQuantity",
      "msg": "Invalid quantity"
    }
  ],
  "types": [
    {
      "name": "eventContract",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "organizer",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "location",
            "type": "string"
          },
          {
            "name": "date",
            "type": "i64"
          },
          {
            "name": "ticketQuantity",
            "type": "u32"
          },
          {
            "name": "ticketPrice",
            "type": "u64"
          },
          {
            "name": "ticketsMinted",
            "type": "u32"
          },
          {
            "name": "soulBoundTokenMint",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "ticketPurchase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "eventId",
            "type": "pubkey"
          },
          {
            "name": "tokenIds",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "quantity",
            "type": "u32"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
