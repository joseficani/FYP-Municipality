import "./MeetTheTeam.css";
import { Landmark, Users, Mail, Phone } from "lucide-react";

export default function MeetTheTeam() {
  const departments = [
    {
      id: "mayors-office",
      name: "Mayor's Office",
      description:
        "The executive leadership of our municipality, responsible for setting the vision and direction for our community's future.",
      members: [
        {
          id: "sarah-mitchell",
          name: "Sarah Mitchell",
          role: "Mayor",
          bio: "Leading community development initiatives and representing citizens' interests at all levels of government.",
          photo: "https://i.pravatar.cc/150?img=1",
          email: "s.mitchell@municipal.gov",
          phone: "(555) 100-2001",
        },
        {
          id: "david-chen",
          name: "David Chen",
          role: "Deputy Mayor",
          bio: "Coordinating inter-departmental projects and overseeing policy implementation across all municipal services.",
          photo: "https://i.pravatar.cc/150?img=3",
          email: "d.chen@municipal.gov",
        },
      ],
    },
    {
      id: "administration",
      name: "Administration",
      description:
        "The backbone of municipal operations, ensuring smooth day-to-day functioning and excellent service delivery.",
      members: [
        {
          id: "patricia-gomez",
          name: "Patricia Gomez",
          role: "Chief Administrator",
          bio: "Managing day-to-day municipal operations and ensuring efficient delivery of public services.",
          photo: "https://i.pravatar.cc/150?img=5",
          email: "p.gomez@municipal.gov",
        },
        {
          id: "james-okafor",
          name: "James Okafor",
          role: "Records Manager",
          bio: "Maintaining public records, managing document archives, and ensuring transparency in municipal documentation.",
          photo: "https://i.pravatar.cc/150?img=7",
        },
        {
          id: "linda-park",
          name: "Linda Park",
          role: "Human Resources Director",
          bio: "Overseeing recruitment, employee development, and workplace policies for all municipal staff.",
          photo: "https://i.pravatar.cc/150?img=9",
          email: "l.park@municipal.gov",
        },
      ],
    },
    {
      id: "engineering",
      name: "Engineering",
      description:
        "Building and maintaining the infrastructure that keeps our community connected and thriving.",
      members: [
        {
          id: "robert-vasquez",
          name: "Robert Vasquez",
          role: "Chief Engineer",
          bio: "Planning and supervising infrastructure projects including roads, bridges, and public facilities.",
          photo: "https://i.pravatar.cc/150?img=11",
          email: "r.vasquez@municipal.gov",
          phone: "(555) 100-3001",
        },
        {
          id: "aisha-patel",
          name: "Aisha Patel",
          role: "Civil Engineer",
          bio: "Designing sustainable drainage systems and managing water infrastructure maintenance programs.",
          photo: "https://i.pravatar.cc/150?img=13",
        },
        {
          id: "marcus-thompson",
          name: "Marcus Thompson",
          role: "Project Coordinator",
          bio: "Tracking construction timelines, managing contractor relationships, and ensuring projects stay on budget.",
          photo: "https://i.pravatar.cc/150?img=15",
        },
      ],
    },
    {
      id: "finance",
      name: "Finance",
      description:
        "Stewarding public funds with transparency and accountability to ensure fiscal responsibility.",
      members: [
        {
          id: "catherine-nguyen",
          name: "Catherine Nguyen",
          role: "Finance Director",
          bio: "Overseeing the municipal budget, financial planning, and ensuring fiscal responsibility and transparency.",
          photo: "https://i.pravatar.cc/150?img=17",
          email: "c.nguyen@municipal.gov",
        },
        {
          id: "thomas-wright",
          name: "Thomas Wright",
          role: "Tax Assessor",
          bio: "Managing property assessments, tax collection processes, and providing taxpayer assistance services.",
          photo: "https://i.pravatar.cc/150?img=19",
          email: "t.wright@municipal.gov",
        },
      ],
    },
    {
      id: "public-services",
      name: "Public Services",
      description:
        "Enhancing quality of life through parks, recreation, and community programs that bring residents together.",
      members: [
        {
          id: "maria-santos",
          name: "Maria Santos",
          role: "Director of Public Services",
          bio: "Coordinating parks, recreation, waste management, and community outreach programs.",
          photo: "https://i.pravatar.cc/150?img=21",
          email: "m.santos@municipal.gov",
          phone: "(555) 100-5001",
        },
        {
          id: "kevin-brown",
          name: "Kevin Brown",
          role: "Parks Supervisor",
          bio: "Maintaining public parks, green spaces, and recreational facilities for community enjoyment.",
          photo: "https://i.pravatar.cc/150?img=23",
        },
        {
          id: "rachel-kim",
          name: "Rachel Kim",
          role: "Community Liaison",
          bio: "Connecting residents with municipal resources and facilitating public engagement in local governance.",
          photo: "https://i.pravatar.cc/150?img=25",
          email: "r.kim@municipal.gov",
        },
      ],
    },
  ];

  return (
    <main className="mttPage">
      {/* HERO */}
      <section className="mttHero">
        {/* <div className="mttHeroPattern"></div>
        <div className="mttHeroBlob mttHeroBlobOne"></div>
        <div className="mttHeroBlob mttHeroBlobTwo"></div> */}

        <div className="mttContainer">
          <div className="mttHeroContent">
            <div className="mttHeroBadge">
              <Users size={16} />
              <span>Your Public Servants</span>
            </div>

            <h1 className="mttHeroTitle">Meet the Municipality</h1>

            <p className="mttHeroText">
              Get to know the dedicated team working to serve our community.
              From administration to public services, these are the people
              committed to making our municipality a better place to live.
            </p>

            <div className="mttHeroDivider"></div>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      {departments.map((department, index) => (
        <section
          key={department.id}
          className={`mttDepartmentSection ${
            index % 2 === 0 ? "mttDeptSubtle" : "mttDeptLight"
          }`}
        >
          <div className="mttContainer">
            <div className="mttDeptHead">
              <div className="mttDeptIconWrap">
                <Landmark size={18} />
              </div>
              <h2 className="mttDeptTitle">{department.name}</h2>
            </div>

            <p className="mttDeptDescription">{department.description}</p>

            <div className="mttMembersGrid">
              {department.members.map((member) => (
                <article className="mttMemberCard" key={member.id}>
                  <div className="mttMemberTop">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="mttMemberImage"
                    />

                    <div className="mttMemberInfo">
                      <h3 className="mttMemberName">{member.name}</h3>
                      <p className="mttMemberRole">{member.role}</p>
                    </div>
                  </div>

                  <p className="mttMemberBio">{member.bio}</p>

                  {(member.email || member.phone) && (
                    <div className="mttMemberContacts">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="mttContactLink"
                        >
                          <Mail size={15} />
                          <span>{member.email}</span>
                        </a>
                      )}

                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="mttContactLink"
                        >
                          <Phone size={15} />
                          <span>{member.phone}</span>
                        </a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}