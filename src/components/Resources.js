import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';

const Resources = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sectionStyle = {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #ddd'
  };

  const headerStyle = {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#2c3e50',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const resourceItemStyle = {
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee'
  };

  const linkStyle = {
    color: '#2196F3',
    textDecoration: 'none',
    fontWeight: 'bold'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>Cat Care Resources</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px', color: '#666' }}>
        Comprehensive directory of nationwide programs providing affordable veterinary care, food assistance, 
        and support services for cat owners and community cats.
      </p>

      {/* SPAY/NEUTER PROGRAMS */}
      <div style={sectionStyle}>
        <h2 
          style={headerStyle}
          onClick={() => toggleSection('spayNeuter')}
        >
          🏥 Spay/Neuter Programs
          <span>{expandedSection === 'spayNeuter' ? '−' : '+'}</span>
        </h2>
        {expandedSection === 'spayNeuter' && (
          <div>
            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.aspca.org/pet-care/general-pet-care/low-cost-spayneuter-programs" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  ASPCA Spay/Neuter Alliance
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>The ASPCA provides grants and resources to local spay/neuter clinics across the country. Their website includes a searchable database of low-cost clinics by ZIP code.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.humanesociety.org/resources/spayneuter-your-pet" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Humane Society - Spay/Neuter Services
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Offers low-cost and free spay/neuter services through participating clinics nationwide. Voucher programs available for qualifying pet owners.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.spayneuterhotline.org/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  SpayUSA Hotline
                </a>
              </h3>
              <p><strong>National | Phone: 1-800-248-SPAY (7729)</strong></p>
              <p>Free referral service connecting pet owners to over 1,000 affordable spay/neuter providers across all 50 states. Available certificates can reduce costs by up to 75%.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.petsmartcharities.org/our-impact/spay-neuter" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  PetSmart Charities Spay/Neuter Grants
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Provides grants to animal welfare organizations offering subsidized spay/neuter services. Search their directory for participating clinics in your area.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.akcreunite.org/clinic-locator/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  AKC Reunite Low-Cost Clinic Locator
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Database of over 1,500 low-cost spay/neuter clinics across the United States, searchable by ZIP code and distance.</p>
            </div>
          </div>
        )}
      </div>

      {/* VACCINATION & VETERINARY CARE */}
      <div style={sectionStyle}>
        <h2 
          style={headerStyle}
          onClick={() => toggleSection('vetCare')}
        >
          💉 Affordable Vaccination & Veterinary Care
          <span>{expandedSection === 'vetCare' ? '−' : '+'}</span>
        </h2>
        {expandedSection === 'vetCare' && (
          <div>
            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.vetco.com/clinics" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Vetco Vaccination Clinics
                </a>
              </h3>
              <p><strong>National (in Petco stores)</strong></p>
              <p>Affordable walk-in vaccination clinics at Petco locations nationwide. Basic cat vaccine packages starting at $35. Check website for clinic schedule near you.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.petsmart.com/services/banfield-pet-hospital/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Banfield Pet Hospital (PetSmart)
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Full-service veterinary hospitals inside PetSmart stores. Wellness plans available starting at $35/month, covering vaccines, exams, and preventive care.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.redrover.org/relief" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  RedRover Relief Urgent Care Grants
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Emergency financial assistance for pet owners facing economic hardship who need urgent veterinary care. Grants typically $200-$600 for life-threatening situations.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.browndog foundation.org/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  The Brown Dog Foundation
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Provides financial assistance for emergency veterinary care to pet owners in need. Application-based grants available for cats requiring urgent medical treatment.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.shakespeareanimalfund.org/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Shakespeare Animal Fund
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Emergency grants up to $600 for life-saving veterinary care. Helps low-income pet owners afford urgent medical procedures and treatments.</p>
            </div>
          </div>
        )}
      </div>

      {/* PET FOOD ASSISTANCE */}
      <div style={sectionStyle}>
        <h2 
          style={headerStyle}
          onClick={() => toggleSection('foodBanks')}
        >
          🍽️ Pet Food Assistance Programs
          <span>{expandedSection === 'foodBanks' ? '−' : '+'}</span>
        </h2>
        {expandedSection === 'foodBanks' && (
          <div>
            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.petfoodpantry.org/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Pet Food Pantry Directory
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Searchable database of over 800 pet food banks across the United States. Find free pet food assistance programs in your area by state and ZIP code.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.feedingpets.org/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Feeding Pets of the Homeless
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Provides pet food and veterinary care to pets of homeless individuals through donation sites at food banks, soup kitchens, and shelters nationwide.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.paws.org/resources/pet-food-bank/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  PAWS Pet Food Bank
                </a>
              </h3>
              <p><strong>Seattle, WA area</strong></p>
              <p>Free pet food distribution for low-income households. Serves Seattle and surrounding communities. Open distribution events held monthly.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.petsnpeople.org/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Pets and People Together
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Partners with human food banks to provide pet food assistance. Many Feeding America member food banks now offer pet food through this program.</p>
            </div>
          </div>
        )}
      </div>

      {/* TNR RESOURCES */}
      <div style={sectionStyle}>
        <h2 
          style={headerStyle}
          onClick={() => toggleSection('tnr')}
        >
          🐱 TNR (Trap-Neuter-Return) Resources
          <span>{expandedSection === 'tnr' ? '−' : '+'}</span>
        </h2>
        {expandedSection === 'tnr' && (
          <div>
            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.alleycat.org/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Alley Cat Allies
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Leading TNR advocacy organization. Provides free guides, trap loan programs, and a feral cat help desk. Extensive resources for community cat caretakers.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.neighborhoodcats.org/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Neighborhood Cats
                </a>
              </h3>
              <p><strong>National (based in NYC)</strong></p>
              <p>Offers TNR training, educational materials, and guidance for managing community cat colonies. Free downloadable TNR handbook and video tutorials.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.feralcat.com/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Feral Cat Focus
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Provides TNR equipment, educational resources, and colony management tools. Offers trap rental programs and step-by-step TNR guides.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.communitycatspodcast.com/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Community Cats Podcast
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Educational podcast and resource hub dedicated to community cat care, TNR best practices, and colony management strategies.</p>
            </div>
          </div>
        )}
      </div>

      {/* FINANCIAL ASSISTANCE */}
      <div style={sectionStyle}>
        <h2 
          style={headerStyle}
          onClick={() => toggleSection('financial')}
        >
          💰 Financial Assistance for Veterinary Care
          <span>{expandedSection === 'financial' ? '−' : '+'}</span>
        </h2>
        {expandedSection === 'financial' && (
          <div>
            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.carecredit.com/vetmed/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  CareCredit for Pets
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Healthcare credit card accepted at over 225,000 veterinary providers nationwide. Special financing options available with 0% interest for 6-24 months on qualifying purchases.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.scratchpay.com/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Scratchpay
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Payment plan options for veterinary care with instant approval. Plans from $200-$10,000 with flexible repayment terms at over 15,000 veterinary clinics.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.gofundme.com/c/blog/help-with-vet-bills" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  GoFundMe Pet Medical Fundraising
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Crowdfunding platform for veterinary expenses. Free to set up campaigns, with resources and guides specifically for pet medical emergencies.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.thepetitefoundation.org/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  The Pet Fund
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Provides financial assistance to owners of domestic animals who need veterinary care. Focus on non-basic, non-urgent care such as cancer treatment, heart disease, etc.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.themaggiemayefoundation.org/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  The Maggie Mae Foundation
                </a>
              </h3>
              <p><strong>California (expanding)</strong></p>
              <p>Grants for emergency veterinary care to low-income pet owners. Assistance with life-threatening conditions requiring immediate treatment.</p>
            </div>
          </div>
        )}
      </div>

      {/* BEHAVIORAL & TRAINING RESOURCES */}
      <div style={sectionStyle}>
        <h2 
          style={headerStyle}
          onClick={() => toggleSection('behavior')}
        >
          🎓 Cat Behavior & Training Resources
          <span>{expandedSection === 'behavior' ? '−' : '+'}</span>
        </h2>
        {expandedSection === 'behavior' && (
          <div>
            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.jacksongalaxy.com/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Jackson Galaxy - Cat Behaviorist
                </a>
              </h3>
              <p><strong>National - Online Resources</strong></p>
              <p>Extensive library of free videos, articles, and guides on cat behavior, training, and problem-solving. Known from Animal Planet's "My Cat From Hell."</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.catbehaviorassociates.com/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Cat Behavior Associates
                </a>
              </h3>
              <p><strong>National - Online Consultations</strong></p>
              <p>Certified cat behavior consultant Pam Johnson-Bennett offers virtual consultations and free educational resources on her website and YouTube channel.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.aspca.org/pet-care/cat-care/common-cat-behavior-issues" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  ASPCA Cat Behavior Resources
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Free comprehensive guides on addressing common cat behavior problems including litter box issues, aggression, scratching, and anxiety.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://indoorpet.osu.edu/cats" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Ohio State University - Indoor Pet Initiative
                </a>
              </h3>
              <p><strong>National - Research-Based Resources</strong></p>
              <p>Science-based information on indoor cat enrichment, behavior, and environmental needs. Free downloadable guides and research articles.</p>
            </div>
          </div>
        )}
      </div>

      {/* REHOMING & ADOPTION RESOURCES */}
      <div style={sectionStyle}>
        <h2 
          style={headerStyle}
          onClick={() => toggleSection('adoption')}
        >
          🏠 Rehoming & Adoption Resources
          <span>{expandedSection === 'adoption' ? '−' : '+'}</span>
        </h2>
        {expandedSection === 'adoption' && (
          <div>
            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.petfinder.com/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Petfinder
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Largest online database of adoptable pets from over 11,000 shelters and rescue groups. Search by location, breed, age, and special needs.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.adoptapet.com/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Adopt-a-Pet
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Free service connecting adoptable pets with potential adopters. Includes resources for responsible rehoming if you can no longer care for your cat.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://getyourpet.com/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Get Your Pet (formerly Rehome)
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Free peer-to-peer adoption platform for safely rehoming pets directly to new owners. Includes screening tools and adoption contracts.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.bestfriends.org/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Best Friends Animal Society
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Network of rescue partners and resources nationwide. Operates America's largest no-kill sanctuary and provides adoption, spay/neuter, and TNR support.</p>
            </div>
          </div>
        )}
      </div>

      {/* EMERGENCY & CRISIS RESOURCES */}
      <div style={sectionStyle}>
        <h2 
          style={headerStyle}
          onClick={() => toggleSection('emergency')}
        >
          🚨 Emergency & Crisis Resources
          <span>{expandedSection === 'emergency' ? '−' : '+'}</span>
        </h2>
        {expandedSection === 'emergency' && (
          <div>
            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.aspcapro.org/safeplacepets" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  ASPCA Safe Place for Pets
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Directory of domestic violence shelters that accept pets. Helps survivors of domestic violence find safe housing with their animals.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  American Red Cross - Pet-Friendly Disaster Shelters
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Locator for emergency shelters that accommodate pets during natural disasters. Many Red Cross shelters now allow pets in designated areas.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.petpoisonhelpline.com/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Pet Poison Helpline
                </a>
              </h3>
              <p><strong>National | Phone: 855-764-7661</strong></p>
              <p>24/7 emergency poisoning hotline. $75 consultation fee per incident includes unlimited follow-up consultations for the same poisoning case.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.aspca.org/pet-care/animal-poison-control" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  ASPCA Animal Poison Control
                </a>
              </h3>
              <p><strong>National | Phone: 888-426-4435</strong></p>
              <p>24/7 emergency poison control center staffed by veterinary toxicologists. $95 consultation fee. Database of over 400,000 toxic substances.</p>
            </div>
          </div>
        )}
      </div>

      {/* EDUCATIONAL RESOURCES */}
      <div style={sectionStyle}>
        <h2 
          style={headerStyle}
          onClick={() => toggleSection('education')}
        >
          📚 Educational Resources & Guides
          <span>{expandedSection === 'education' ? '−' : '+'}</span>
        </h2>
        {expandedSection === 'education' && (
          <div>
            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.cornell.edu/video/playlist/cats" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Cornell Feline Health Center
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Veterinary research and educational resources from Cornell University. Free health articles, videos, and guides on all aspects of cat care and common health conditions.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://catfriendly.com/" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Cat Friendly Homes & Practices
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>International Cat Care's program for creating cat-friendly environments. Directory of certified cat-friendly veterinary practices and educational resources.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Winn Feline Foundation
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Funds feline health research and provides educational resources based on latest scientific findings. Free access to research summaries and health reports.</p>
            </div>

            <div style={resourceItemStyle}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                <a href="https://www.avma.org/resources/pet-owners/petcare/cats" 
                   target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  American Veterinary Medical Association - Cat Care
                </a>
              </h3>
              <p><strong>National</strong></p>
              <p>Trusted veterinary information on preventive care, nutrition, behavior, and common health issues. Science-based guides written by veterinary professionals.</p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER NOTE */}
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#fff3cd', 
        borderRadius: '8px',
        border: '1px solid #ffc107'
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          <strong>Note:</strong> This list is regularly updated but program availability and eligibility may change. 
          Always contact organizations directly to confirm services, costs, and requirements. If you know of additional 
          resources that should be included, please contact us.
        </p>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#e8f5e9', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#2e7d32' }}>
          <strong>Having trouble affording cat care?</strong> Many programs are income-based or offer flexible payment options. 
          Don't hesitate to reach out and ask - these organizations want to help keep pets and families together.
        </p>
      </div>
    </div>
  );
};

export default Resources;