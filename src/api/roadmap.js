// import { apiRequest } from "@/utils/apiRequest";
import fetch from 'isomorphic-fetch';

const BASE_URL = 'http://192.168.3.171:3000';

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3NTU4NzkzOTJ9.QGgZhttrBGvb0WFqODRLk3kkAxnwhFygJTdHe0EtA0g';

export const fetchRoadmap = async () => {
  const response = await fetch(
    `${BASE_URL}/api/roadmaps`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return response.json();
};

export const fetchRoadmapWithId = async (id) => {
  const response = await fetch(
    `${BASE_URL}/api/roadmaps/${id}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return response.json();
};

export const generateRoadmap = async (userInput) => {
  const response = await fetch(
    `${BASE_URL}/api/roadmaps/`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_query: userInput
      }),
    },
  );
  return response.json();
};
