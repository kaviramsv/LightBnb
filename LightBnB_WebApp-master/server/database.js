
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
})

const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
  return pool
    .query(`SELECT * FROM users where email = $1`, [email])
    .then((result) => {
      // console.log(result.rows);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);

    });

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {

  // return Promise.resolve(users[id]);
  return pool
    .query(`SELECT name FROM users where id = $1`, [id])
    .then((result) => {
      // console.log(result.rows);
      return result.rows[0];
    }
    )
    .catch((err) => {
      console.log(err.message);

    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user_obj) {
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
  const user = user_obj.name;
  const mail = user_obj.email;
  const pwd = user_obj.password;
  return pool
    .query(`INSERT INTO users (name,email,password)
    VALUES ($1,$2,$3) RETURNING *;`, [user, mail, pwd])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });



}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  // return getAllProperties(null, 2);
  return pool
    .query(
      `SELECT properties.*, avg(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = $1
AND reservations.end_date < now()::date
GROUP BY properties.id
LIMIT $2;`
      , [guest_id, limit])
    .then((result) => (result.rows))
    .catch((err) => {
      console.log(err.message);
    });


}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The parseInt of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

// const getAllProperties = (options, limit = 10) => {
//  return pool
//     .query(`SELECT * FROM properties LIMIT $1`, [limit])
//     .then((result) =>result.rows )
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

const getAllProperties = function (options, limit = 10) {
  console.log(options.minimum_price_per_night);

  console.log('Check',typeof(Number(options.minimum_price_per_night)));

  const queryParams = [];
  // options.owner_id = 2;
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  WHERE 1=1 
  `;
 
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;   
  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);  
    queryString += ` AND owner_id = $${queryParams.length} `;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);    
    queryString += ` AND cost_per_night > $${queryParams.length}`;      
  }
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += ` AND cost_per_night < $${queryParams.length}`;
  } 
  queryString += `GROUP BY properties.id`;
 if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`); 
    queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length}`;   
  }

  queryParams.push(limit);
  queryString +=` ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;
/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
