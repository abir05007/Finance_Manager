const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL || '******localhost:5432/finance_manager', {
  dialect: 'postgres',
  logging: false,
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weekly_expense_report: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tuition_reminder: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

const Expense = sequelize.define('Expense', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(50),
    defaultValue: 'Other'
  },
  description: {
    type: DataTypes.TEXT
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.NOW
  },
  type: {
    type: DataTypes.STRING(50)
  },
  reminder_at: {
    type: DataTypes.DATE
  },
  reminder_sent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  reminder_note: {
    type: DataTypes.TEXT
  }
});

const Debt = sequelize.define('Debt', {
  debt_type: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  person: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  note: {
    type: DataTypes.TEXT
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.NOW
  }
});

const TuitionRecord = sequelize.define('TuitionRecord', {
  student_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  total_days: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_completed: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  completed_date: {
    type: DataTypes.DATEONLY
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  days: {
    type: DataTypes.JSON
  },
  tuition_time: {
    type: DataTypes.STRING(10)
  }
});

const Profile = sequelize.define('Profile', {
  profile_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  picture_filename: {
    type: DataTypes.STRING(255)
  },
  email: {
    type: DataTypes.STRING(120)
  },
  profession: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  institution: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  grade: {
    type: DataTypes.STRING(50)
  }
});

const TuitionReschedule = sequelize.define('TuitionReschedule', {
  original_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  new_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  original_time: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  new_time: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  reason: {
    type: DataTypes.TEXT
  },
  reschedule_status: {
    type: DataTypes.STRING(20),
    defaultValue: 'pending'
  }
});

const Group = sequelize.define('Group', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  join_code: {
    type: DataTypes.STRING(10),
    unique: true
  }
});

const GroupMember = sequelize.define('GroupMember', {
  joined_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

const GroupExpense = sequelize.define('GroupExpense', {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.NOW
  }
});

const ExpenseSplit = sequelize.define('ExpenseSplit', {
  share_amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  is_paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Setup relationships
User.hasMany(Expense, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Debt, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Debt.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Profile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(TuitionRecord, { foreignKey: 'user_id', onDelete: 'CASCADE' });
TuitionRecord.belongsTo(User, { foreignKey: 'user_id' });

TuitionRecord.hasMany(TuitionReschedule, { foreignKey: 'tuition_id', onDelete: 'CASCADE' });
TuitionReschedule.belongsTo(TuitionRecord, { foreignKey: 'tuition_id' });

User.hasMany(Group, { foreignKey: 'created_by' });
Group.belongsTo(User, { foreignKey: 'created_by' });

Group.hasMany(GroupMember, { foreignKey: 'group_id', onDelete: 'CASCADE' });
GroupMember.belongsTo(Group, { foreignKey: 'group_id' });

User.hasMany(GroupMember, { foreignKey: 'user_id' });
GroupMember.belongsTo(User, { foreignKey: 'user_id' });

Group.hasMany(GroupExpense, { foreignKey: 'group_id', onDelete: 'CASCADE' });
GroupExpense.belongsTo(Group, { foreignKey: 'group_id' });

User.hasMany(GroupExpense, { foreignKey: 'paid_by' });
GroupExpense.belongsTo(User, { foreignKey: 'paid_by' });

GroupExpense.hasMany(ExpenseSplit, { foreignKey: 'expense_id', onDelete: 'CASCADE' });
ExpenseSplit.belongsTo(GroupExpense, { foreignKey: 'expense_id' });

User.hasMany(ExpenseSplit, { foreignKey: 'user_id' });
ExpenseSplit.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Expense,
  Debt,
  TuitionRecord,
  Profile,
  TuitionReschedule,
  Group,
  GroupMember,
  GroupExpense,
  ExpenseSplit
};
