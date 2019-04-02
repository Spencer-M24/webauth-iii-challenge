
exports.up = function(knex) {
    
    return knex.schema.createTable('users', users => {
    
        users.increments();

      
      users
      // User name  
      .string('username', 128)
    
        .notNullable()

        .unique();
    
        // Password
        users.string('password', 128).notNullable();
    
        users.string('department'); 
    });
  };

  

  
  exports.down = function(knex, Promise) {
  
    return knex.schema.dropTableIfExists('users');
  
};