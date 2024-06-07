const { db } = require('./config');
const { doc, setDoc } = require('firebase/firestore');

async function addData() {
    const data = {
        "options": {
            "math": {
                "chapter1": {
                    "Câu hỏi 1": {
                        "question": "Bài toán về phép cộng 2 + 2 bằng mấy?",
                            "answer": "4"
                    },
                    "Câu hỏi 2": {
                        "question": "Bài toán về phép nhân 3 x 4 bằng mấy?",
                            "answer": "12"
                    }
                },
                "chapter2": {
                    "Câu hỏi 1": {
                        "question": "Bài toán về phép trừ 5 - 3 bằng mấy?",
                            "answer": "2"
                    },
                    "Câu hỏi 2": {
                        "question": "Bài toán về phép chia 8 ÷ 2 bằng mấy?",
                            "answer": "4"
                    }
                }
            },
            "literature": {
                "chapter1": {
                    "Câu hỏi 1": {
                        "question": "Ai là tác giả của cuốn tiểu thuyết 'Vợ nhặt'?",
                            "answer": "Kim Lân"
                    },
                    "Câu hỏi 2": {
                        "question": "Trong tiểu thuyết 'Số đỏ', nhân vật nào làm 'Anh hùng lao động'?",
                            "answer": "Văn Trịnh"
                    }
                },
                "chapter2": {
                    "Câu hỏi 1": {
                        "question": "Cuốn sách nào được coi là 'Bí kíp thành công' của Dale Carnegie?",
                            "answer": "Làm thế nào để thu bạn và ảnh hưởng đến người khác"
                    },
                    "Câu hỏi 2": {
                        "question": "Cuốn sách 'Nhà giả kim' là tác phẩm của tác giả nào?",
                            "answer": "Paulo Coelho"
                    }
                }
            }
        }

};

try {
    await setDoc(doc(db, 'options', 'data'), data);
    console.log('Data added successfully');
} catch (error) {
    console.error('Error adding document:', error);
}
}

addData();
