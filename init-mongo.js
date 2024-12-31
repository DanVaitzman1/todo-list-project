// Switch to 'admin' database to create a user
const adminDb = db.getSiblingDB('admin');

// Create a new user with access to the 'todo-list' database
adminDb.createUser({
    user: 'todoUser',
    pwd: 'todoPassword',
    roles: [
        { role: 'readWrite', db: 'todo-list' }
    ]
});

print('User "todoUser" created successfully with access to the "todo-list" database.');

// Switch to 'todo-list' database
const todoDb = db.getSiblingDB('todo-list');

// Create a counters collection for auto-incrementing IDs
todoDb.createCollection('counters');
todoDb.counters.insertMany([
    { _id: 'users', seq: 0 },
    { _id: 'tasks', seq: 0 }
]);

// Function to get the next sequence value
function getNextSequence(name) {
    const counter = todoDb.counters.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        { returnDocument: 'after' }
    );
    return counter.seq;
}

// Create users collection with user_id as the primary key
todoDb.createCollection('users', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['user_id', 'first_name', 'last_name', 'email', 'password'],
            properties: {
                user_id: { bsonType: 'int', description: 'Must be an integer and is required' },
                first_name: { bsonType: 'string', description: 'Must be a string and is required' },
                last_name: { bsonType: 'string', description: 'Must be a string and is required' },
                email: { bsonType: 'string', description: 'Must be a string and is required' },
                password: { bsonType: 'string', description: 'Must be a string and is required' }
            }
        }
    }
});

// Create unique index on user_id
todoDb.users.createIndex({ user_id: 1 }, { unique: true });

// Insert an example user with auto-incremented user_id
todoDb.users.insertOne({
    user_id: getNextSequence('users'),
    first_name: "Dan",
    last_name: "Vaitzman",
    email: "dan@vaitzman.com",
    password: "1234qwer"
});

print('Example user created with auto-assigned user_id.');

// Create tasks collection with task_id as the primary key
todoDb.createCollection('tasks', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['task_id', 'title', 'description', 'create_date', 'update_date', 'due_date', 'priority_id', 'status_id', 'assigned_user_id'],
            properties: {
                task_id: { bsonType: 'int', description: 'Must be an integer and is required' },
                title: { bsonType: 'string', description: 'Must be a string and is required' },
                description: { bsonType: 'string', description: 'Must be a string and is required' },
                create_date: { bsonType: 'date', description: 'Must be a date and is required' },
                update_date: { bsonType: 'date', description: 'Must be a date and is required' },
                due_date: { bsonType: 'date', description: 'Must be a date and is required' },
                priority_id: { bsonType: 'int', description: 'Must be an integer and is required' },
                status_id: { bsonType: 'int', description: 'Must be an integer and is required' },
                assigned_user_id: { bsonType: 'int', description: 'Must be an integer referencing user_id and is required' }
            }
        }
    }
});

// Create unique index on task_id
todoDb.tasks.createIndex({ task_id: 1 }, { unique: true });

// Insert an example task with auto-incremented task_id
todoDb.tasks.insertOne({
    task_id: getNextSequence('tasks'),
    title: "Complete the project",
    description: "Finish the backend implementation",
    create_date: new Date(),
    update_date: new Date(),
    due_date: new Date("2024-12-31T23:59:59Z"),
    priority_id: 3,
    status_id: 1,
    assigned_user_id: 1
});

print('Example task created with auto-assigned task_id.');

print('Database "todo-list" initialized with collections "users" and "tasks" with auto-increment IDs.');
