import { gql, useQuery } from '@apollo/client';
import './App.css';

const GET_LAUNCHES = gql`
  query {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data);

  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <div style={{ display: 'flex-wrap', flexWrap: 'wrap', margin: 20 }}>
        {data.launches.map((el, i) => (
          <div
            key={i}
            style={{
              margin: 10,
              padding: 10,
              border: '1px solid #c9c9c9',
              borderRadius: 10,
            }}
          >
            <h2>{el.rocket.rocket_name}</h2>
            <p style={{ fontWeight: 'bold' }}>
              Launched date
              <span style={{ fontWeight: 'normal', marginLeft: 10 }}>
                {el.launch_date_utc}
              </span>
            </p>
            <p style={{ fontWeight: 'bold' }}>
              Result
              <span style={{ fontWeight: 'normal', marginLeft: 10 }}>
                {el.launch_success ? 'success' : 'failed'}
              </span>
            </p>
            <p style={{ fontWeight: 'bold' }}>
              Video link
              <span style={{ fontWeight: 'normal', marginLeft: 10 }}>
                <a href={el.links.video_link}>Link to youtube</a>{' '}
                {el.links.video_link}
              </span>
            </p>
            <p style={{ fontWeight: 'bold' }}>
              Details
              <span style={{ fontWeight: 'normal', marginLeft: 10 }}>
                {el.details}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
