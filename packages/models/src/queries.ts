// Placeholder for GraphQL queries and mutations
export const GET_TASKS = `
  query GetTasks($householdId: ID!) {
    listTasks(filter: { householdId: { eq: $householdId } }) {
      items {
        id
        title
        completed
        timeEstimate
        category
        createdAt
      }
    }
  }
`;

export const CREATE_TASK = `
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      completed
      timeEstimate
      category
      createdAt
    }
  }
`;