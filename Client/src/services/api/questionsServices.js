import * as apiClient from './apiClient';
import { API_QUESTIONS, API_QUESTIONS_SUBMIT } from './endpoints';


export const getTestQuestions = async () => apiClient.get(API_QUESTIONS);
export const sendTestAnswers = async answers => apiClient.post(API_QUESTIONS_SUBMIT, answers);
// export const getCourseTeachers = async courseId => apiClient.get(API_COURSES_ID_USERS(courseId));
// export const getTeacherCourses = async () => apiClient.get(API_TEACHER_COURSES);
// export const createCourse = async course => apiClient.post(API_COURSES, course);
// export const updateCourse = async course => apiClient.patch(API_COURSES_ID(course.id), course);
// export const deleteCourse = async courseId => apiClient.apiDelete(API_COURSES_ID(courseId));
// export const updateCourseTeachers = async ({ courseId, teachers }) =>
//   apiClient.put(API_COURSES_ID_USERS(courseId), teachers);
