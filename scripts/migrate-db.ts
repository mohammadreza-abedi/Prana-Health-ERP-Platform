import { db, pool } from "../server/db";
import { sql } from "drizzle-orm";

/**
 * میگریشن دستی دیتابیس برای اعمال تغییرات جدید
 * این اسکریپت به صورت تدریجی تغییرات را اعمال می‌کند تا دیتا از بین نرود
 */
async function migrateDatabase() {
  console.log("شروع میگریشن دیتابیس...");
  
  try {
    // بررسی وجود جدول‌های موجود
    const tables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    const existingTables = tables.rows.map((row: any) => row.table_name);
    console.log("جدول‌های موجود:", existingTables);
    
    // اضافه کردن فیلدهای جدید به جدول users
    if (existingTables.includes('users')) {
      console.log("بروزرسانی جدول users...");
      
      // اضافه کردن ستون‌های جدید به users اگر وجود ندارند
      const userColumns = await db.execute(sql`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'users'
      `);
      
      const existingUserColumns = userColumns.rows.map((row: any) => row.column_name);
      console.log("ستون‌های موجود در users:", existingUserColumns);
      
      // اضافه کردن ستون‌های جدید اگر وجود ندارند
      if (!existingUserColumns.includes('email')) {
        await db.execute(sql`ALTER TABLE users ADD COLUMN email TEXT NULL`);
        console.log("ستون email به users اضافه شد");
      }
      
      if (!existingUserColumns.includes('phone')) {
        await db.execute(sql`ALTER TABLE users ADD COLUMN phone TEXT NULL`);
        console.log("ستون phone به users اضافه شد");
      }
      
      if (!existingUserColumns.includes('bio')) {
        await db.execute(sql`ALTER TABLE users ADD COLUMN bio TEXT NULL`);
        console.log("ستون bio به users اضافه شد");
      }
      
      if (!existingUserColumns.includes('theme')) {
        await db.execute(sql`ALTER TABLE users ADD COLUMN theme TEXT DEFAULT 'light'`);
        console.log("ستون theme به users اضافه شد");
      }
      
      if (!existingUserColumns.includes('language')) {
        await db.execute(sql`ALTER TABLE users ADD COLUMN language TEXT DEFAULT 'fa'`);
        console.log("ستون language به users اضافه شد");
      }
      
      if (!existingUserColumns.includes('notifications')) {
        await db.execute(sql`ALTER TABLE users ADD COLUMN notifications BOOLEAN DEFAULT TRUE`);
        console.log("ستون notifications به users اضافه شد");
      }
      
      if (!existingUserColumns.includes('last_active')) {
        await db.execute(sql`ALTER TABLE users ADD COLUMN last_active TIMESTAMP NULL`);
        console.log("ستون last_active به users اضافه شد");
      }
      
      if (!existingUserColumns.includes('updated_at')) {
        await db.execute(sql`ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT NOW() NOT NULL`);
        console.log("ستون updated_at به users اضافه شد");
      }
    }
    
    // ایجاد جدول‌های جدید
    if (!existingTables.includes('user_profiles')) {
      console.log("ایجاد جدول user_profiles...");
      await db.execute(sql`
        CREATE TABLE user_profiles (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
          first_name TEXT,
          last_name TEXT,
          birth_date DATE,
          gender TEXT,
          height REAL,
          weight REAL,
          blood_type TEXT,
          medical_conditions TEXT[],
          allergies TEXT[],
          emergency_contact TEXT,
          fitness_goals TEXT[],
          diet_preferences TEXT[],
          occupation TEXT,
          employee_id TEXT,
          hire_date DATE,
          position TEXT,
          address TEXT,
          city TEXT,
          province TEXT,
          postal_code TEXT,
          country TEXT DEFAULT 'Iran',
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW() NOT NULL
        )
      `);
      console.log("جدول user_profiles ایجاد شد");
    }
    
    if (!existingTables.includes('body_compositions')) {
      console.log("ایجاد جدول body_compositions...");
      await db.execute(sql`
        CREATE TABLE body_compositions (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id),
          date DATE NOT NULL,
          weight REAL,
          height REAL,
          bmi REAL,
          body_fat_percentage REAL,
          muscle_mass REAL,
          bone_mass REAL,
          water_percentage REAL,
          visceral_fat REAL,
          metabolic_age INTEGER,
          waist_circumference REAL,
          hip_circumference REAL,
          waist_to_hip_ratio REAL,
          chest_circumference REAL,
          arm_circumference REAL,
          thigh_circumference REAL,
          calf_circumference REAL,
          neck_circumference REAL,
          shoulder_width REAL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW() NOT NULL
        )
      `);
      console.log("جدول body_compositions ایجاد شد");
    }
    
    // بروزرسانی جدول health_metrics موجود
    if (existingTables.includes('health_metrics')) {
      console.log("بروزرسانی جدول health_metrics...");
      
      const healthMetricsColumns = await db.execute(sql`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'health_metrics'
      `);
      
      const existingHealthMetricsColumns = healthMetricsColumns.rows.map((row: any) => row.column_name);
      console.log("ستون‌های موجود در health_metrics:", existingHealthMetricsColumns);
      
      // اضافه کردن ستون‌های جدید
      if (!existingHealthMetricsColumns.includes('distance')) {
        await db.execute(sql`ALTER TABLE health_metrics ADD COLUMN distance REAL DEFAULT 0`);
        console.log("ستون distance به health_metrics اضافه شد");
      }
      
      if (!existingHealthMetricsColumns.includes('calories')) {
        await db.execute(sql`ALTER TABLE health_metrics ADD COLUMN calories INTEGER DEFAULT 0`);
        console.log("ستون calories به health_metrics اضافه شد");
      }
      
      if (!existingHealthMetricsColumns.includes('active_minutes')) {
        await db.execute(sql`ALTER TABLE health_metrics ADD COLUMN active_minutes INTEGER DEFAULT 0`);
        console.log("ستون active_minutes به health_metrics اضافه شد");
      }
      
      // اضافه کردن سایر فیلدهای جدید
      const columnsToAdd = [
        { name: 'heart_rate', type: 'INTEGER' },
        { name: 'heart_rate_min', type: 'INTEGER' },
        { name: 'heart_rate_max', type: 'INTEGER' },
        { name: 'sleep_quality', type: 'INTEGER DEFAULT 50' },
        { name: 'sleep_deep_hours', type: 'REAL' },
        { name: 'sleep_light_hours', type: 'REAL' },
        { name: 'sleep_rem_hours', type: 'REAL' },
        { name: 'meal_count', type: 'INTEGER' },
        { name: 'calorie_intake', type: 'INTEGER' },
        { name: 'protein_intake', type: 'INTEGER' },
        { name: 'carb_intake', type: 'INTEGER' },
        { name: 'fat_intake', type: 'INTEGER' },
        { name: 'fiber_intake', type: 'INTEGER' },
        { name: 'mood_rating', type: 'INTEGER' },
        { name: 'o2_saturation', type: 'INTEGER' },
        { name: 'blood_pressure_systolic', type: 'INTEGER' },
        { name: 'blood_pressure_diastolic', type: 'INTEGER' },
        { name: 'blood_glucose', type: 'INTEGER' },
        { name: 'updated_at', type: 'TIMESTAMP DEFAULT NOW() NOT NULL' }
      ];
      
      for (const column of columnsToAdd) {
        if (!existingHealthMetricsColumns.includes(column.name)) {
          await db.execute(sql`ALTER TABLE health_metrics ADD COLUMN ${sql.raw(column.name)} ${sql.raw(column.type)}`);
          console.log(`ستون ${column.name} به health_metrics اضافه شد`);
        }
      }
    }
    
    // ایجاد جدول سلامت روانی
    if (!existingTables.includes('mental_health_metrics')) {
      console.log("ایجاد جدول mental_health_metrics...");
      await db.execute(sql`
        CREATE TABLE mental_health_metrics (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id),
          date DATE NOT NULL,
          stress_level INTEGER DEFAULT 50,
          anxiety_level INTEGER DEFAULT 50,
          depression_level INTEGER DEFAULT 50,
          mood_rating INTEGER DEFAULT 50,
          sleep_quality INTEGER DEFAULT 50,
          energy_level INTEGER DEFAULT 50,
          focus_level INTEGER DEFAULT 50,
          motivation_level INTEGER DEFAULT 50,
          social_interaction_level INTEGER DEFAULT 50,
          notes TEXT,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW() NOT NULL
        )
      `);
      console.log("جدول mental_health_metrics ایجاد شد");
    }
    
    // بروزرسانی جدول challenges
    if (existingTables.includes('challenges')) {
      console.log("بروزرسانی جدول challenges...");
      
      const challengesColumns = await db.execute(sql`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'challenges'
      `);
      
      const existingChallengesColumns = challengesColumns.rows.map((row: any) => row.column_name);
      console.log("ستون‌های موجود در challenges:", existingChallengesColumns);
      
      // اضافه کردن ستون‌های جدید
      const challengeColumnsToAdd = [
        { name: 'difficulty', type: "TEXT DEFAULT 'medium'" },
        { name: 'target_metric', type: "TEXT DEFAULT 'steps'" },
        { name: 'reward_type', type: "TEXT DEFAULT 'xp'" },
        { name: 'reward_value', type: 'INTEGER DEFAULT 100' },
        { name: 'category', type: 'TEXT' },
        { name: 'start_date', type: 'DATE' },
        { name: 'end_date', type: 'DATE' },
        { name: 'is_active', type: 'BOOLEAN DEFAULT TRUE' },
        { name: 'is_team_challenge', type: 'BOOLEAN DEFAULT FALSE' },
        { name: 'created_by', type: 'INTEGER REFERENCES users(id)' },
        { name: 'updated_at', type: 'TIMESTAMP DEFAULT NOW() NOT NULL' }
      ];
      
      for (const column of challengeColumnsToAdd) {
        if (!existingChallengesColumns.includes(column.name)) {
          await db.execute(sql`ALTER TABLE challenges ADD COLUMN ${sql.raw(column.name)} ${sql.raw(column.type)}`);
          console.log(`ستون ${column.name} به challenges اضافه شد`);
        }
      }
    }
    
    // ایجاد جدول‌های جدید برای محتوای آموزشی
    const newTables = [
      {
        name: 'educational_contents',
        query: sql`
          CREATE TABLE educational_contents (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            category TEXT NOT NULL,
            type TEXT NOT NULL,
            content TEXT NOT NULL,
            author TEXT,
            estimated_duration INTEGER,
            points INTEGER DEFAULT 10,
            tags TEXT[],
            level TEXT DEFAULT 'beginner',
            created_at TIMESTAMP DEFAULT NOW() NOT NULL,
            updated_at TIMESTAMP DEFAULT NOW() NOT NULL
          )
        `
      },
      {
        name: 'user_educations',
        query: sql`
          CREATE TABLE user_educations (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            content_id INTEGER NOT NULL REFERENCES educational_contents(id),
            completion_date DATE,
            progress INTEGER DEFAULT 0,
            quiz_score INTEGER,
            certificate_earned BOOLEAN DEFAULT FALSE,
            feedback TEXT,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL,
            updated_at TIMESTAMP DEFAULT NOW() NOT NULL
          )
        `
      },
      {
        name: 'health_reminders',
        query: sql`
          CREATE TABLE health_reminders (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            title TEXT NOT NULL,
            description TEXT,
            type TEXT NOT NULL,
            recurrence TEXT NOT NULL,
            start_time TEXT NOT NULL,
            end_time TEXT,
            days_of_week TEXT[],
            interval INTEGER,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL,
            updated_at TIMESTAMP DEFAULT NOW() NOT NULL
          )
        `
      },
      {
        name: 'workout_plans',
        query: sql`
          CREATE TABLE workout_plans (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            difficulty TEXT NOT NULL,
            target_area TEXT NOT NULL,
            estimated_duration INTEGER NOT NULL,
            calories_burn INTEGER,
            created_by INTEGER REFERENCES users(id),
            is_public BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL,
            updated_at TIMESTAMP DEFAULT NOW() NOT NULL
          )
        `
      },
      {
        name: 'exercises',
        query: sql`
          CREATE TABLE exercises (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            instructions TEXT NOT NULL,
            muscle_groups TEXT[],
            difficulty TEXT NOT NULL,
            media TEXT,
            equipment_needed TEXT[],
            estimated_duration INTEGER,
            calories_burn INTEGER,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL,
            updated_at TIMESTAMP DEFAULT NOW() NOT NULL
          )
        `
      },
      {
        name: 'workout_exercises',
        query: sql`
          CREATE TABLE workout_exercises (
            id SERIAL PRIMARY KEY,
            workout_plan_id INTEGER NOT NULL REFERENCES workout_plans(id),
            exercise_id INTEGER NOT NULL REFERENCES exercises(id),
            set_count INTEGER DEFAULT 3,
            rep_count INTEGER DEFAULT 10,
            rest_time INTEGER DEFAULT 60,
            exercise_order INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL
          )
        `
      },
      {
        name: 'surveys',
        query: sql`
          CREATE TABLE surveys (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            questions JSONB NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            is_active BOOLEAN DEFAULT TRUE,
            created_by INTEGER REFERENCES users(id),
            created_at TIMESTAMP DEFAULT NOW() NOT NULL,
            updated_at TIMESTAMP DEFAULT NOW() NOT NULL
          )
        `
      },
      {
        name: 'survey_responses',
        query: sql`
          CREATE TABLE survey_responses (
            id SERIAL PRIMARY KEY,
            survey_id INTEGER NOT NULL REFERENCES surveys(id),
            user_id INTEGER NOT NULL REFERENCES users(id),
            answers JSONB NOT NULL,
            submitted_at TIMESTAMP DEFAULT NOW() NOT NULL,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL
          )
        `
      }
    ];
    
    for (const table of newTables) {
      if (!existingTables.includes(table.name)) {
        console.log(`ایجاد جدول ${table.name}...`);
        try {
          await db.execute(table.query);
          console.log(`جدول ${table.name} ایجاد شد`);
        } catch (error) {
          console.error(`خطا در ایجاد جدول ${table.name}:`, error);
        }
      }
    }
    
    console.log("میگریشن دیتابیس با موفقیت انجام شد!");
    
  } catch (error) {
    console.error("خطا در میگریشن دیتابیس:", error);
  } finally {
    // بستن اتصال
    await pool.end();
    process.exit(0);
  }
}

migrateDatabase();