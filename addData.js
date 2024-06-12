// Import Firestore from config.js
const { db } = require("./config");
const { doc, setDoc, updateDoc, arrayUnion } = require("firebase/firestore");

// Function to add a course
async function addCourse(courseId, courseName, courseDescription, courseTools) {
  const courseRef = doc(db, "courses", courseId);
  await setDoc(courseRef, {
    courseId: courseId,
    courseName: courseName,
    courseDescription: JSON.stringify(courseDescription),
    courseTools: courseTools,
    courseLevels: [], // Khởi tạo mảng rỗng cho courseLevels
  });
  console.log(`Course ${courseId} added successfully.`);
}

// Function to add a level to a course
async function addLevel(
  levelId,
  courseId,
  levelName,
  levelDescription,
  levelTools
) {
  // 1. Thêm level vào collection 'levels'
  const levelRef = doc(db, "courses", courseId, "levels", levelId);
  await setDoc(levelRef, {
    levelId: levelId,
    courseId: courseId,
    levelName: levelName,
    levelDescription: levelDescription,
    levelTools: levelTools,
    levelLessons: [], // Khởi tạo mảng rỗng cho levelLessons
  });

  // 2. Cập nhật courseLevels trong document course
  const courseRef = doc(db, "courses", courseId);
  await updateDoc(courseRef, {
    courseLevels: arrayUnion(levelId),
  });

  console.log(`Level ${levelId} added successfully to course ${courseId}.`);
}

// Function to add a lesson to a level
async function addLesson(
  lessonId,
  levelId,
  courseId,
  lessonProject,
  lessonName,
  lessonNumber,
  lessonImage,
  lessonTopic,
  lessonGoal,
  lessonTools,
  lessonDescription,
  conceptComputerScience,
  conceptScience,
  conceptSkill,
  lessonTechniques,
  linkLessonPlan,
  linkSlide,
  linkSummary,
  linkQuiz,
  linkVideo
) {
  // 1. Thêm lesson vào collection 'lessons'
  const lessonRef = doc(
    db,
    "courses",
    courseId,
    "levels",
    levelId,
    "lessons",
    lessonId
  );
  await setDoc(lessonRef, {
    lessonId: lessonId,
    levelId: levelId,
    courseId: courseId,
    lessonProject: lessonProject,
    lessonName: lessonName,
    lessonNumber: lessonNumber,
    lessonImage: lessonImage,
    lessonTopic: lessonTopic,
    lessonGoal: lessonGoal,
    lessonTools: lessonTools,
    lessonDescription: lessonDescription,
    conceptComputerScience: conceptComputerScience,
    conceptScience: conceptScience,
    conceptSkill: conceptSkill,
    lessonTechniques: lessonTechniques,
    linkLessonPlan: linkLessonPlan,
    linkSlide: linkSlide,
    linkSummary: linkSummary,
    linkQuiz: linkQuiz,
    linkVideo: linkVideo,
  });

  // 2. Cập nhật levelLessons trong document level
  const levelRef = doc(db, "courses", courseId, "levels", levelId);
  await updateDoc(levelRef, {
    levelLessons: arrayUnion(lessonId),
  });

  console.log(
    `Lesson ${lessonId} added successfully to level ${levelId} in course ${courseId}.`
  );
}

// Example usage
(async () => {
  try {
    const courseDescriptionBLG = {
      intro: "Khóa học Bé làm Game giúp học sinh tiếp cận, làm quen và phát triển tư duy - khả năng lập trình thông qua chuỗi các công cụ coding vô cùng thú vị như Codekitten, Tynker, Minecraft, Cospace.",
      duration: "Thời lượng: 3 học kỳ tương đương với 12 học phần (120 phút/buổi học)",
      content: "Học sinh sẽ tiếp cận, làm quen và phát triển tư duy - khả năng lập trình thông qua chuỗi các môn học - các công cụ coding vô cùng thú vị:",
      tools: [
        "Lập trình Game 2D với Codekitten: Đây là ngôn ngữ lập trình trẻ em phổ biến nhất thế giới, phát triển bởi học viện MIT, Mỹ. Trẻ em tại nhiều quốc gia bắt đầu học lập trình từ 5 tuổi. Công cụ giúp học sinh sáng tạo và phát triển ý tưởng, tăng cường tư duy logic và tiếp cận công nghệ - lập trình một cách tốt nhất.",
        "Lập trình Game 2D với Tynker: Giáo trình xuất sắc tại Mỹ với 50 triệu học sinh và được sử dụng trong 60 nghìn trường học trên toàn cầu - môn học giúp học sinh tăng cường tư duy kịch bản, tư duy logic, xử lý thành thục và hoàn thiện sản phẩm của mình, chuyển hóa hành vi nghiện game thành tìm hiểu và ứng dụng công nghệ để tạo ra game.",
        "Lập trình Game 3D với Minecraft: Nền tảng giảng dạy lập trình nổi tiếng của tập đoàn Microsoft, với mục tiêu 'Powering Imagination' nghĩa là sự nạp năng lượng cho trí tưởng tượng. Trong Minecraft, người học có thể tạo cho mình một thế giới ảo riêng được viết mã (script) bằng ngôn ngữ lập trình.",
      ],
    };

    const courseDescriptionKPRB = {
      intro: "Khóa học Khám Phá Robotics giúp học sinh làm quen với robot và thế giới lập trình robot.",
      duration: "Thời lượng: 2 học kỳ tương đương 8 học phần (120 phút/buổi học)",
      content: "Học sinh sẽ được:",
      tools: [
        "Làm quen với các loại robot và cách thức hoạt động của chúng",
        "Học cách lắp ráp và điều khiển robot đơn giản",
        "Tìm hiểu về cảm biến và cách sử dụng chúng trong lập trình robot",
        "Phát triển kỹ năng tư duy logic, giải quyết vấn đề và làm việc nhóm thông qua các dự án thực hành",
      ],
    };

    // Add courses
    await addCourse("BLG", "Bé Làm Game", courseDescriptionBLG, ["Codekitten", "Tynker", "MakeCode"]);
    await addCourse("KPRB", "Khám Phá Robotics", courseDescriptionKPRB, ["Bộ LEGO Mindstorms", "Arduino", "Raspberry Pi"]);

    // Add levels to BLG course
    await addLevel("BLG-HP1", "BLG", "Học phần 1", "Làm quen với CodeKitten", ["Tài liệu CodeKitten", "Video hướng dẫn"]);
    await addLevel("BLG-HP2", "BLG", "Học phần 2", "Luyện tập với CodeKitten", ["Bài tập CodeKitten", "Dự án mẫu"]);
    // ... thêm các học phần khác của BLG

    // Add levels to KPRB course
    await addLevel("KPRB-HP1", "KPRB", "Học phần 1", "Giới thiệu về Robot", ["Tài liệu Robot", "Video giới thiệu"]);
    await addLevel("KPRB-HP2", "KPRB", "Học phần 2", "Lắp ráp Robot cơ bản", ["Hướng dẫn lắp ráp", "Linh kiện robot"]);
    // ... thêm các học phần khác của KPRB

    // Add lessons to BLG-HP1
    await addLesson(
      "lesson1",
      "BLG-HP1",
      "BLG",
      "project1",
      "Làm quen với giao diện CodeKitten",
      1,
      "https://example.com/lesson1-image.jpg",
      "Giới thiệu về CodeKitten",
      "Hiểu được giao diện và các thành phần của CodeKitten",
      ["Tài liệu hướng dẫn CodeKitten"],
      "Mô tả chi tiết về bài học 1",
      ["Khái niệm 1", "Khái niệm 2"],
      ["Khoa học 1"],
      ["Kỹ năng 1", "Kỹ năng 2"],
      ["Kỹ thuật 1"],
      "https://example.com/lesson1-plan.pdf",
      "https://example.com/lesson1-slide.pptx",
      "https://example.com/lesson1-summary.pdf",
      "https://example.com/lesson1-quiz.html",
      "https://example.com/lesson1-video.mp4"
    );
    await addLesson(
      "lesson2",
      "BLG-HP1",
      "BLG",
      "project2",
      "Điều khiển nhân vật di chuyển",
      2,
      "https://example.com/lesson2-image.jpg",
      "Điều khiển nhân vật",
      "Biết cách điều khiển nhân vật di chuyển trong CodeKitten",
      ["Tài liệu hướng dẫn CodeKitten"],
      "Mô tả chi tiết về bài học 2",
      ["Khái niệm 3", "Khái niệm 4"],
      ["Khoa học 2"],
      ["Kỹ năng 3", "Kỹ năng 4"],
      ["Kỹ thuật 2"],
      "https://example.com/lesson2-plan.pdf",
      "https://example.com/lesson2-slide.pptx",
      "https://example.com/lesson2-summary.pdf",
      "https://example.com/lesson2-quiz.html",
      "https://example.com/lesson2-video.mp4"
    );
    // ... thêm các bài học khác cho BLG-HP1 và các học phần khác

    // Add lessons to KPRB-HP1
    await addLesson(
      "lesson1",
      "KPRB-HP1",
      "KPRB",
      "project1",
      "Giới thiệu về Robot",
      1,
      "https://example.com/lesson1-kprb-image.jpg",
      "Robot là gì?",
      "Hiểu được định nghĩa về Robot và ứng dụng của nó",
      ["Hình ảnh robot"],
      "Mô tả chi tiết về bài học 1 - KPRB",
      ["Khái niệm 1 - KPRB", "Khái niệm 2 - KPRB"],
      ["Khoa học 1 - KPRB"],
      ["Kỹ năng 1 - KPRB", "Kỹ năng 2 - KPRB"],
      ["Kỹ thuật 1 - KPRB"],
      "https://example.com/lesson1-kprb-plan.pdf",
      "https://example.com/lesson1-kprb-slide.pptx",
      "https://example.com/lesson1-kprb-summary.pdf",
      "https://example.com/lesson1-kprb-quiz.html",
      "https://example.com/lesson1-kprb-video.mp4"
    );
    // ... thêm các bài học khác cho KPRB-HP1 và các học phần khác

  } catch (error) {
    console.error("Error adding document: ", error);
  }
})();