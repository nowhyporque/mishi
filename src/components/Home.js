import React from 'react';

const Home = () => {
  return (
    <div style={{
      width: '100%',
      backgroundColor: '#fff',
      minHeight: '100vh'
    }}>
      {/* Hero Section with Image */}
      <div style={{
        width: '100%',
        height: '400px',
        backgroundImage: 'url(https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '50px'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(107, 70, 193, 0.7)'
        }}></div>
        <div style={{
          position: 'relative',
          textAlign: 'center',
          color: 'white',
          padding: '0 20px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            margin: '0 0 15px 0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Welcome to Mishi 🐾
          </h1>
          <p style={{
            fontSize: '24px',
            margin: 0,
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            Helping stray cats find care and safety
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 40px 60px 40px'
      }}>
        {/* Our Mission */}
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '32px',
            color: '#6B46C1',
            marginBottom: '20px',
            borderBottom: '3px solid #6B46C1',
            paddingBottom: '10px'
          }}>
            Our Mission
          </h2>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#333',
            marginBottom: '15px'
          }}>
            Mishi is a community-driven platform dedicated to protecting and caring for stray cats. We believe every cat deserves a safe environment, proper nutrition, and medical care. Our mission is to connect compassionate individuals who want to make a difference in the lives of community cats.
          </p>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#333'
          }}>
            Through collaborative mapping, resource sharing, and fostering networks, we're building a movement of cat advocates working together to create safer communities for our feline friends. Whether you're reporting a sighting, offering to foster, or simply looking for resources, Mishi provides the tools you need to take action.
          </p>
        </section>

        {/* What We Do */}
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '32px',
            color: '#6B46C1',
            marginBottom: '20px',
            borderBottom: '3px solid #6B46C1',
            paddingBottom: '10px'
          }}>
            What We Do
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            marginTop: '30px'
          }}>
            <div style={{
              padding: '25px',
              backgroundColor: '#f9f9f9',
              borderRadius: '12px',
              border: '2px solid #e1e8ed'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>🗺️</div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#6B46C1' }}>
                Interactive Mapping
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', margin: 0 }}>
                Report cat sightings, colonies, and emergency situations. View helper zones to find volunteers in your area ready to assist with food, shelter, TNR, and medical care.
              </p>
            </div>

            <div style={{
              padding: '25px',
              backgroundColor: '#f9f9f9',
              borderRadius: '12px',
              border: '2px solid #e1e8ed'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>🏠</div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#6B46C1' }}>
                Fostering Network
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', margin: 0 }}>
                Apply to become a foster parent or post cats in need of temporary homes. Our fostering system connects cats with caring individuals who can provide safe shelter during transitions.
              </p>
            </div>

            <div style={{
              padding: '25px',
              backgroundColor: '#f9f9f9',
              borderRadius: '12px',
              border: '2px solid #e1e8ed'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>📚</div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#6B46C1' }}>
                Resource Directory
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', margin: 0 }}>
                Access a comprehensive directory of affordable veterinary services, TNR programs, food assistance, and educational materials to help you care for community cats effectively.
              </p>
            </div>

            <div style={{
              padding: '25px',
              backgroundColor: '#f9f9f9',
              borderRadius: '12px',
              border: '2px solid #e1e8ed'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>👥</div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#6B46C1' }}>
                Community Forum
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', margin: 0 }}>
                Share stories, ask questions, and connect with other cat advocates. Our community is here to support each other in making a real difference for stray and feral cats.
              </p>
            </div>
          </div>
        </section>

        {/* How to Use Mishi */}
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '32px',
            color: '#6B46C1',
            marginBottom: '20px',
            borderBottom: '3px solid #6B46C1',
            paddingBottom: '10px'
          }}>
            How to Use Mishi
          </h2>

          <div style={{ marginTop: '30px' }}>
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '30px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#6B46C1',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                1
              </div>
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#333' }}>
                  Report Cat Sightings
                </h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', margin: 0 }}>
                  Navigate to the Maps page and click anywhere on the map to report a stray cat, colony, or kitten sighting. Mark urgent situations with the SOS flag to alert nearby helpers immediately.
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '30px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#6B46C1',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                2
              </div>
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#333' }}>
                  Offer Your Help
                </h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', margin: 0 }}>
                  Create a Helper Zone on the map to let others know you can provide food, shelter, TNR assistance, fostering, or transport within your area. Set your coverage radius and availability to connect with cats in need.
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '30px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#6B46C1',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                3
              </div>
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#333' }}>
                  Apply to Foster
                </h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', margin: 0 }}>
                  Complete a foster application through the Fostering page to open your home to cats in need of temporary care. You can also browse cats currently seeking foster families and post your own if you've found a cat that needs placement.
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '30px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#6B46C1',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                4
              </div>
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#333' }}>
                  Access Resources
                </h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', margin: 0 }}>
                  Visit the Resources page for a comprehensive directory of spay/neuter programs, affordable veterinary care, food assistance, TNR support, and educational materials. All resources are verified and organized by category for easy access.
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#6B46C1',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                5
              </div>
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#333' }}>
                  Join the Community
                </h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', margin: 0 }}>
                  Share your experiences, ask questions, and connect with fellow cat advocates in our Community forum. Post updates, celebrate successes, and learn from others who are making a difference in their neighborhoods.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section style={{
          backgroundColor: '#f0f8ff',
          padding: '40px',
          borderRadius: '12px',
          border: '2px solid #6B46C1',
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '28px',
            color: '#6B46C1',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Why Community Cat Care Matters
          </h2>
          <p style={{
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#333',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            Millions of stray and feral cats live in communities across the United States. Without proper care, these cats face hunger, disease, and harsh weather conditions. Community cat programs like TNR (Trap-Neuter-Return) have been proven to humanely reduce cat populations while improving the lives of existing colonies.
          </p>
          <p style={{
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#333',
            margin: 0,
            textAlign: 'center'
          }}>
            By working together through Mishi, we can ensure that every cat has access to food, medical care, and safety. Your involvement—whether reporting a sighting, offering resources, or fostering—makes a tangible difference in the lives of these vulnerable animals.
          </p>
        </section>

        {/* Call to Action */}
        <div style={{
          textAlign: 'center',
          padding: '40px 0'
        }}>
          <h2 style={{
            fontSize: '32px',
            color: '#6B46C1',
            marginBottom: '20px'
          }}>
            Ready to Make a Difference?
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '30px'
          }}>
            Start exploring Mishi today and join our community of cat advocates.
          </p>
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a 
              href="/maps"
              style={{
                padding: '15px 30px',
                backgroundColor: '#6B46C1',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '24px',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a3aa3'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6B46C1'}
            >
              Explore the Map
            </a>
            <a 
              href="/fostering"
              style={{
                padding: '15px 30px',
                backgroundColor: 'white',
                color: '#6B46C1',
                textDecoration: 'none',
                borderRadius: '24px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: '2px solid #6B46C1',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6B46C1';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#6B46C1';
              }}
            >
              Apply to Foster
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;