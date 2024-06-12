// Import Firestore from config.js
const { db } = require('./config');
const { doc, setDoc, collection } = require('firebase/firestore');

// Function to add a course
async function addCourse(courseId, courseName, description) {
    const courseRef = doc(db, 'course', courseId);
    await setDoc(courseRef, {
        courseId: courseId,
        courseName: courseName,
        description: description
    });
    console.log(`Course ${courseId} added successfully.`);
}

// Function to add a level to a course
async function addLevel(courseId, levelId, levelName, description) {
    const levelRef = doc(db, 'course', courseId, 'level', levelId);
    await setDoc(levelRef, {
        levelId: levelId,
        levelName: levelName,
        courseId: courseId,
        description: description
    });
    console.log(`Level ${levelId} added successfully to course ${courseId}.`);
}

// Function to add a lesson to a level
async function addLesson(courseId, levelId, lessonId, lessonName, content) {
    const lessonRef = doc(db, 'course', courseId, 'level', levelId, 'lesson', lessonId);
    await setDoc(lessonRef, {
        lessonId: lessonId,
        lessonName: lessonName,
        courseId: courseId,
        levelId: levelId,
        content: content
    });
    console.log(`Lesson ${lessonId} added successfully to level ${levelId} in course ${courseId}.`);
}

// Example usage
(async () => {
    try {
        // Add courses
        await addCourse('course1', 'Math 101', 'Basic Mathematics');
        await addCourse('course2', 'Physics 101', 'Basic Physics');

        // Add levels to course1
        await addLevel('course1', 'level1', 'Beginner', 'Introduction to basic concepts');
        await addLevel('course1', 'level2', 'Intermediate', 'Intermediate concepts');

        // Add lessons to course1 -> level1
        await addLesson('course1', 'level1', 'lesson1', 'Addition', 'Learn how to add numbers');
        await addLesson('course1', 'level1', 'lesson2', 'Subtraction', 'Learn how to subtract numbers');
        await addLesson('course1', 'level1', 'lesson3', 'Multiplication', 'Learn how to multiply numbers');

        // Add lessons to course1 -> level2
        await addLesson('course1', 'level2', 'lesson1', 'Algebra', 'Learn basic algebra');
        await addLesson('course1', 'level2', 'lesson2', 'Geometry', 'Learn basic geometry');
        
        // Add levels to course2
        await addLevel('course2', 'level1', 'Beginner', 'Introduction to basic physics concepts');
        await addLevel('course2', 'level2', 'Intermediate', 'Intermediate physics concepts');

        // Add lessons to course2 -> level1
        await addLesson('course2', 'level1', 'lesson1', 'Newton\'s Laws', 'Learn about Newton\'s laws of motion');
        await addLesson('course2', 'level1', 'lesson2', 'Kinematics', 'Learn about the motion of objects');

        // Add lessons to course2 -> level2
        await addLesson('course2', 'level2', 'lesson1', 'Electricity', 'Learn about electricity');
        await addLesson('course2', 'level2', 'lesson2', 'Magnetism', 'Learn about magnetism');

    } catch (error) {
        console.error("Error adding document: ", error);
    }
})();
