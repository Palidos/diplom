// Base
export const API_BASE = `/api`;

// Classes
export const API_CLASSES = `${API_BASE}/classes`; // api/classes
export const API_CLASSES_ID = classId => `${API_CLASSES}/${classId}`; // api/classes/{id}
export const API_CLASSES_ID_USERS = classId => `${API_CLASSES_ID(classId)}/users`;  // api/classes/{id}/users
export const API_CLASSES_ID_SCHEDULE = classId => `${API_CLASSES_ID(classId)}/schedule`;  // api/classes/{id}/schedule
export const API_CLASSES_ID_USERS_ID = (classId, userId) => `${API_CLASSES_ID_USERS(classId)}/${userId}`; // api/classes/{id}/users/{id}
export const API_CLASSES_ID_FILES = classId => `${API_CLASSES}/${classId}/files`; // api/classes/{id}/files
export const API_CLASSES_FROM_TO = (from, to) => // api/classes?from=2019-09-19&to=2019-09-19
  `${API_CLASSES}?${from ? `from=${from}` : ''}${from && to ? '&' : ''}${to ? `to=${to}` : ''}`;

export const API_GROUPS_ID_CLASSES_NEXT = (groupId, limit) =>
  // api/groups/{id}/classes/next?limit=10
  `${API_BASE}/groups/${groupId}/classes/next${limit ? `?limit=${limit}` : ''}`;

// Students
export const API_FEED = (limit, until) => `${API_BASE}/feed?${until ? `until=${until}&` : ''}limit=${limit}`; // api/feed?limit={limit}&until=2019-12-25
export const API_STUDENT = `${API_BASE}/student`; // api/classes
export const API_STUDENT_CLASSES_NEXT = limit => `${API_BASE}/student/classes/next${limit ? `?limit=${limit}` : ''}`; // api/student/classes/next?limit=2
export const API_STUDENT_CLASSES_FROM_TO = (from, to) => // api/student/classes?from=y/m/d&to=y/m/d
  `${API_STUDENT}/classes?${from ? `from=${from}` : ''}${from && to ? '&' : ''}${to ? `to=${to}` : ''}`;

// Schedules
export const API_SCHEDULES = `${API_BASE}/schedules`; // api/schedules
export const API_SCHEDULES_CHANGES = `${API_SCHEDULES}/changes`;  // api/schedules/changes
export const API_SCHEDULES_ID = id => `${API_SCHEDULES}/${id}`; // api/schedules/{id}

// Files
export const API_FILES = `${API_BASE}/files`; // api/files
export const API_FILES_ID = fileId => `${API_FILES}/${fileId}`; // api/files/{id}

// Groups
export const API_GROUPS = `${API_BASE}/groups`; // api/groups
export const API_GROUPS_ID = groupId => `${API_GROUPS}/${groupId}`; // api/groups/{id}
export const API_GROUPS_ID_USERS = groupId => `${API_GROUPS_ID(groupId)}/users`;  // api/groups/{id}/users
export const API_GROUPS_ID_SCHEDULES = groupId => `${API_GROUPS_ID(groupId)}/schedules`;  // api/groups/{id}/schedules

// Users
export const API_USERS = `${API_BASE}/users`; // api/users
export const API_USERS_ROLES = `${API_USERS}/roles`;  // api/users/roles
export const API_USERS_SEARCH = `${API_USERS}/search`;  // api/users/search
export const API_USERS_ID = userId => `${API_USERS}/${userId}`; // api/users/{id}
export const API_USERS_ID_ROLES = userId => `${API_USERS_ID(userId)}/roles`;  // api/users/{id}/roles

// Identity
export const API_IDENTITY = `${API_BASE}/identity`;                     // api/identity
export const API_IDENTITY_LOGOUT = `${API_IDENTITY}/logout`;            // api/identity/logout
export const API_IMPERSONATE = `${API_BASE}/impersonate`;               // api/impersonate

// Rooms
export const API_ROOMS = `${API_BASE}/rooms`; // api/rooms
export const API_ROOMS_ID = roomId => `${API_ROOMS}/${roomId}`; // api/rooms/{id}
export const API_TEACHER = `${API_BASE}/teacher`; // api/teacher
export const API_TEACHER_ROOMS = `${API_TEACHER}/rooms`; // api/teacher/rooms

// Courses
export const API_COURSES = `${API_BASE}/courses`;                       // api/courses
export const API_COURSES_ID = courseId => `${API_COURSES}/${courseId}`; // api/courses/{id}
export const API_COURSES_ID_USERS = courseId => `${API_COURSES}/${courseId}/users`; // api/courses/{id}/users
export const API_TEACHER_COURSES = `${API_TEACHER}/courses`; // api/teacher/courses
