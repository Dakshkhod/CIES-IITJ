"""
Management command to import all hardcoded frontend data into the database.

Usage:
    python manage.py import_seed_data

This will import:
- Activities (49 items)
- Events (10 items)
- Team Members (21 members)
- Contact Information
- Dropdown values (roles, committees)
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime

from apps.core.models import DropDown, ContactInfo
from apps.events.models import Events
from apps.team.models import TeamMember


class Command(BaseCommand):
    help = "Import all hardcoded frontend data into the database"

    def handle(self, *args, **options):
        self.stdout.write("Starting data import...")

        # 1. Create Dropdowns (Roles and Committees)
        self.import_dropdowns()

        # 2. Import Activities
        self.import_activities()

        # 3. Import Events
        self.import_events()

        # 4. Import Team Members
        self.import_team_members()

        # 5. Create Contact Info
        self.import_contact_info()

        self.stdout.write(self.style.SUCCESS("✅ All data imported successfully!"))

    def import_dropdowns(self):
        self.stdout.write("Importing dropdowns (roles & committees)...")

        # Roles
        roles = [
            "Head of Department",
            "Faculty Advisor",
            "Secretary",
            "Joint Secretary",
            "PG Representative",
            "Events & Community Engagement Lead",
            "Executive",
            "Technical Lead",
            "Tech-Lead (UG)-Web Dev Executive",
            "Seminars & Academic Engagement",
            "PG Lead",
            "Media & Design Lead",
            "Media & Design Executive",
            "Media & Design",
            "Outreach & Publicity Lead",
            "Outreach & Publicity Executive",
        ]

        # Committees
        committees = [
            "Faculty Leadership",
            "Coordination Committee",
            "Events & Community Engagement Committee",
            "Technical Committee",
            "Seminars & Academic Engagement Committee",
            "Media & Design Committee",
            "Outreach & Publicity Committee",
        ]

        # Create parent dropdowns
        roles_parent, _ = DropDown.objects.get_or_create(label="Roles")
        committees_parent, _ = DropDown.objects.get_or_create(label="Committees")

        for role in roles:
            DropDown.objects.get_or_create(label=role, parent=roles_parent)

        for committee in committees:
            DropDown.objects.get_or_create(label=committee, parent=committees_parent)

        self.stdout.write(f"  Created {len(roles)} roles and {len(committees)} committees")

    def import_activities(self):
        self.stdout.write("Importing activities...")

        activities = [
            {"id": "1", "title": "Research Presentation (P21CI002) - Saran Kumar Aatrey", "date": "2025-05-09", "category": "seminar"},
            {"id": "2", "title": "Research Presentation (D20CI003) - Aparna Singh", "date": "2025-05-23", "category": "seminar"},
            {"id": "3", "title": "Research Presentation (D20CI002) - Pranav Suraswat", "date": "2025-06-06", "category": "seminar"},
            {"id": "4", "title": "Seminar/Talk by Experts (Prof. Ravindra Gettu)", "date": "2025-06-10", "category": "seminar"},
            {"id": "5", "title": "Seminar/Talk by Experts (Prof. Jitesh Monhot)", "date": "2025-06-27", "category": "seminar"},
            {"id": "6", "title": "Research Presentation (D20CI003) - Sumrita Rathi", "date": "2025-07-09", "category": "seminar"},
            {"id": "7", "title": "Research Presentation (D20CI051) - Shubham Bhakar", "date": "2025-07-23", "category": "seminar"},
            {"id": "8", "title": "Presentation (P21CI011) - Anand Kumar", "date": "2025-08-13", "category": "seminar"},
            {"id": "9", "title": "Merchandise Release for Students, Staff and Faculties", "date": "2025-08-12", "category": "other"},
            {"id": "10", "title": "Freshers (PG)", "date": "2025-08-31", "category": "edificio"},
            {"id": "11", "title": "Teacher's Day (Community Gathering/Sports Event)", "date": "2025-09-05", "category": "other"},
            {"id": "12", "title": "Engineer's Day", "date": "2025-09-15", "category": "other"},
            {"id": "13", "title": "Research Presentation (P21CI002) - Ananya Srivastava", "date": "2025-09-15", "category": "seminar"},
            {"id": "14", "title": "Research Presentation (P21CI003) - Ashish Gupta", "date": "2025-09-19", "category": "seminar"},
            {"id": "15", "title": "Industry Day (No Event)", "date": "2025-09-26", "category": "seminar"},
            {"id": "16", "title": "Online Talk by Prof. Rajhaman", "date": "2025-09-27", "category": "seminar"},
            {"id": "17", "title": "Freshers (UG)", "date": "2025-10-05", "category": "edificio"},
            {"id": "18", "title": "Sports Event (Dusshera)", "date": "2025-10-02", "category": "competition"},
            {"id": "19", "title": "Guest Lecture by Prof. Ligy (IITM)", "date": "2025-10-13", "category": "seminar"},
            {"id": "20", "title": "Research Presentation (P21CI005) - Keshav Saini", "date": "2025-10-10", "category": "seminar"},
            {"id": "21", "title": "Workshop on Geospatial (Compulsory for Geoinformatics Students)", "date": "2025-10-11", "category": "workshop"},
            {"id": "22", "title": "Diwali Celebration", "date": "2025-10-14", "category": "other"},
            {"id": "23", "title": "Dr. Abhinav Session", "date": "2025-11-01", "category": "seminar"},
            {"id": "24", "title": "Saturday Stories (UG/PG Seniors) - Dept. Open Mic", "date": "2025-11-01", "category": "other"},
            {"id": "25", "title": "Research Presentation (P21CI006) - Koduru Sandeep", "date": "2025-11-07", "category": "seminar"},
            {"id": "26", "title": "Skill Development Session", "date": "2025-11-14", "category": "workshop"},
            {"id": "27", "title": "Presentation (P21CI007) - Mohit Singh Parihar", "date": "2025-11-21", "category": "seminar"},
            {"id": "28", "title": "Hackathon/Ideathon Problem Statement Release - EDIFICIO", "date": "2025-12-01", "category": "edificio"},
            {"id": "29", "title": "Research Presentation (P21CI009) - Santosh Bisayi", "date": "2025-12-05", "category": "seminar"},
            {"id": "30", "title": "Hackathon & Ideathon Registration Close - EDIFICIO", "date": "2025-12-10", "category": "edificio"},
            {"id": "31", "title": "Alumni Connect Online Edition (B20/B21)", "date": "2025-12-20", "category": "other"},
            {"id": "32", "title": "Seminar/Talk by Experts", "date": "2025-12-12", "category": "seminar"},
            {"id": "33", "title": "Research Presentation (P21CI010) - Shahiq Ahmad Wani", "date": "2025-12-19", "category": "seminar"},
            {"id": "34", "title": "EDIFICIO (CiviQ/Hackathon/Ideathon/Bridge Making)", "date": "2026-01-05", "category": "edificio"},
            {"id": "35", "title": "Research Presentation (P21CI011) - Sriram Monika devi", "date": "2026-01-09", "category": "seminar"},
            {"id": "36", "title": "Interaction with New PG Students/Orientation", "date": "2026-01-09", "category": "other"},
            {"id": "37", "title": "Sports Event", "date": "2026-01-11", "category": "competition"},
            {"id": "38", "title": "Research Scholars Day", "date": "2026-01-17", "category": "other"},
            {"id": "39", "title": "Basanth Panchami", "date": "2026-01-29", "category": "other"},
            {"id": "40", "title": "Research Presentation (D21CI051) - Vijesh Prajapat", "date": "2026-02-06", "category": "seminar"},
            {"id": "41", "title": "Seminar/Talk by Experts", "date": "2026-02-13", "category": "seminar"},
            {"id": "42", "title": "Skill Development Workshop", "date": "2026-02-20", "category": "workshop"},
            {"id": "43", "title": "Seniors Talk", "date": "2026-03-02", "category": "seminar"},
            {"id": "44", "title": "Research Presentation (P22CI001) - Ankit Kumar Maurya", "date": "2026-03-13", "category": "seminar"},
            {"id": "45", "title": "Industry Visit", "date": "2026-03-20", "category": "site-visit"},
            {"id": "46", "title": "Research Presentation (P22CI002) - Mayank Tiwari", "date": "2026-03-27", "category": "seminar"},
            {"id": "47", "title": "Farewell", "date": "2026-04-05", "category": "other"},
            {"id": "48", "title": "Research Presentation (P22CI003) - Sumit", "date": "2026-04-10", "category": "seminar"},
            {"id": "49", "title": "Seminar/Talk by Experts", "date": "2026-04-15", "category": "seminar"},
        ]

        created_count = 0
        for item in activities:
            event_date = datetime.strptime(item["date"], "%Y-%m-%d").date()
            today = timezone.now().date()
            
            # Determine status based on date
            if event_date < today:
                status = "completed"
            elif event_date == today:
                status = "ongoing"
            else:
                status = "upcoming"

            # Check if already exists
            if not Events.objects.filter(title=item["title"], event_category="activity").exists():
                Events.objects.create(
                    title=item["title"],
                    date=event_date,
                    event_category="activity",
                    category=item["category"],
                    activity_status=status,
                    location="IIT Jodhpur Campus",
                )
                created_count += 1

        self.stdout.write(f"  Created {created_count} activities")

    def import_events(self):
        self.stdout.write("Importing events...")

        events = [
            {
                "title": "Orientation of Batch 25 (PG)",
                "date": "2025-07-15",
                "category": "other",
                "description": "Welcome session for new postgraduate students joining the Civil & Infrastructure Engineering program.",
                "location": "IIT Jodhpur Campus",
                "attendees": 50,
            },
            {
                "title": "Orientation of Batch 25 (UG)",
                "date": "2025-07-20",
                "category": "other",
                "description": "Welcome session for new undergraduate students joining the Civil & Infrastructure Engineering program.",
                "location": "IIT Jodhpur Campus",
                "attendees": 100,
            },
            {
                "title": "Merchandise Release for Students, Staff and Faculties",
                "date": "2025-08-12",
                "category": "other",
                "description": "Launch of new CIES merchandise including t-shirts, hoodies, and accessories for the CIES community.",
                "location": "CIES Office",
                "attendees": 200,
            },
            {
                "title": "Freshers (PG)",
                "date": "2025-08-31",
                "category": "edificio",
                "description": "Welcome party for postgraduate students with cultural performances, games, and networking.",
                "location": "IIT Jodhpur Auditorium",
                "attendees": 60,
            },
            {
                "title": "Teacher's Day (Community Gathering/Sports Event)",
                "date": "2025-09-05",
                "category": "other",
                "description": "Annual celebration honoring our faculty members with sports activities and community gathering.",
                "location": "IIT Jodhpur Sports Complex",
                "attendees": 150,
            },
            {
                "title": "Engineer's Day",
                "date": "2025-09-15",
                "category": "other",
                "description": "Celebration of engineering excellence with technical talks, competitions, and recognition of outstanding engineers.",
                "location": "IIT Jodhpur Campus",
                "attendees": 200,
            },
            {
                "title": "Freshers (UG)",
                "date": "2025-10-05",
                "category": "edificio",
                "description": "Welcome celebration for undergraduate students featuring cultural performances and interactive sessions.",
                "location": "IIT Jodhpur Auditorium",
                "attendees": 120,
            },
            {
                "title": "Guest Lecture by Prof. Ligy (IITM)",
                "date": "2025-10-13",
                "category": "seminar",
                "description": "Expert lecture on advanced topics in civil engineering by distinguished professor from IIT Madras.",
                "location": "IIT Jodhpur Lecture Hall",
                "attendees": 80,
            },
            {
                "title": "Workshop on Geospatial (Compulsory for Geoinformatics Students)",
                "date": "2025-10-11",
                "category": "workshop",
                "description": "Hands-on workshop covering geospatial technologies, GIS applications, and remote sensing techniques.",
                "location": "IIT Jodhpur Computer Lab",
                "attendees": 40,
            },
            {
                "title": "Diwali Celebration",
                "date": "2025-10-14",
                "category": "other",
                "description": "Festive celebration of Diwali with traditional decorations, sweets, and cultural performances.",
                "location": "IIT Jodhpur Campus",
                "attendees": 300,
            },
        ]

        created_count = 0
        for item in events:
            event_date = datetime.strptime(item["date"], "%Y-%m-%d").date()
            today = timezone.now().date()
            
            if event_date < today:
                status = "completed"
            elif event_date == today:
                status = "ongoing"
            else:
                status = "upcoming"

            # Check if already exists
            if not Events.objects.filter(title=item["title"], event_category="event").exists():
                Events.objects.create(
                    title=item["title"],
                    date=event_date,
                    event_category="event",
                    category=item["category"],
                    activity_status=status,
                    description=item["description"],
                    location=item["location"],
                    attendees_count=item["attendees"],
                    featured=True,
                )
                created_count += 1

        self.stdout.write(f"  Created {created_count} events")

    def import_team_members(self):
        self.stdout.write("Importing team members...")

        # Get dropdown references
        def get_role(label):
            try:
                return DropDown.objects.get(label=label)
            except DropDown.DoesNotExist:
                roles_parent, _ = DropDown.objects.get_or_create(label="Roles")
                return DropDown.objects.create(label=label, parent=roles_parent)

        def get_committee(label):
            try:
                return DropDown.objects.get(label=label)
            except DropDown.DoesNotExist:
                committees_parent, _ = DropDown.objects.get_or_create(label="Committees")
                return DropDown.objects.create(label=label, parent=committees_parent)

        team_data = [
            {"name": "Dr. A. B. C.", "role": "Head of Department", "committee": "Faculty Leadership", "batch": "Faculty", "bio": "Head of the Civil & Infrastructure Engineering Department.", "featured": True, "is_hod": True, "is_faculty": True},
            {"name": "Dr. X. Y. Z.", "role": "Faculty Advisor", "committee": "Faculty Leadership", "batch": "Faculty", "bio": "Faculty advisor for the Civil Engineering Society.", "featured": True, "is_faculty": True},
            {"name": "Dr. P. Q. R.", "role": "Faculty Advisor", "committee": "Faculty Leadership", "batch": "Faculty", "bio": "Faculty advisor for the Civil Engineering Society.", "featured": True, "is_faculty": True},
            {"name": "Dr. M. N. O.", "role": "Faculty Advisor", "committee": "Faculty Leadership", "batch": "Faculty", "bio": "Faculty advisor for the Civil Engineering Society.", "featured": True, "is_faculty": True},
            {"name": "Ashwani", "role": "Secretary", "committee": "Coordination Committee", "batch": "UG 2024", "bio": "Secretary — coordinates society operations.", "featured": True},
            {"name": "Mayank Tiwari", "role": "PG Representative", "committee": "Coordination Committee", "batch": "PG 2024", "bio": "Postgraduate representative connecting PG students with society activities."},
            {"name": "Shashank", "role": "Joint Secretary", "committee": "Coordination Committee", "batch": "UG 2024", "bio": "Joint Secretary."},
            {"name": "Saurabh", "role": "Events & Community Engagement Lead", "committee": "Events & Community Engagement Committee", "batch": "UG 2024", "bio": "Leading events and community outreach initiatives."},
            {"name": "Vikas", "role": "Executive", "committee": "Events & Community Engagement Committee", "batch": "UG 2024", "bio": "Executive member supporting event organization and community engagement."},
            {"name": "Manish", "role": "Executive", "committee": "Events & Community Engagement Committee", "batch": "UG 2024", "bio": "Executive member contributing to society events and activities."},
            {"name": "Keshav Saini", "role": "Technical Lead", "committee": "Technical Committee", "batch": "PG 2024", "bio": "Technical lead managing web development and digital initiatives."},
            {"name": "Daksh", "role": "Tech-Lead (UG)-Web Dev Executive", "committee": "Technical Committee", "batch": "UG 2024", "bio": "Web dev and technical executive.", "featured": True},
            {"name": "Falak Khan", "role": "Seminars & Academic Engagement", "committee": "Seminars & Academic Engagement Committee", "batch": "UG 2024", "bio": "Organizing seminars and academic engagement programs."},
            {"name": "Faizah Wani", "role": "PG Lead", "committee": "Seminars & Academic Engagement Committee", "batch": "PG 2024", "bio": "PG lead for academic seminars and research engagement."},
            {"name": "Sri Raghava", "role": "PG Lead", "committee": "Seminars & Academic Engagement Committee", "batch": "PG 2024", "bio": "PG lead coordinating academic and research activities."},
            {"name": "Deepali", "role": "Media & Design Lead", "committee": "Media & Design Committee", "batch": "UG 2024", "bio": "Leading design and media content creation for the society."},
            {"name": "Nitesh", "role": "Media & Design Executive", "committee": "Media & Design Committee", "batch": "UG 2024", "bio": "Supporting design and media initiatives for society events."},
            {"name": "Harsh", "role": "Media & Design", "committee": "Media & Design Committee", "batch": "UG 2024", "bio": "Design & media."},
            {"name": "Simran Sehgal", "role": "Media & Design Executive", "committee": "Media & Design Committee", "batch": "UG 2024", "bio": "Creative executive handling visual content and media."},
            {"name": "Simranjit Kaur", "role": "Media & Design Executive", "committee": "Media & Design Committee", "batch": "UG 2024", "bio": "Supporting media and design activities for society outreach."},
            {"name": "Ram Kunawar", "role": "Outreach & Publicity Lead", "committee": "Outreach & Publicity Committee", "batch": "UG 2024", "bio": "Leading outreach and publicity efforts for society events."},
            {"name": "Nishant", "role": "Outreach & Publicity Executive", "committee": "Outreach & Publicity Committee", "batch": "UG 2024", "bio": "Supporting outreach initiatives and event promotion."},
        ]

        created_count = 0
        for idx, member in enumerate(team_data):
            _, created = TeamMember.objects.get_or_create(
                name=member["name"],
                defaults={
                    "role": get_role(member["role"]),
                    "committee": get_committee(member["committee"]),
                    "batch": member["batch"],
                    "bio": member["bio"],
                    "featured": member.get("featured", False),
                    "is_hod": member.get("is_hod", False),
                    "is_faculty": member.get("is_faculty", False),
                    "is_active": True,
                    "display_order": idx,
                }
            )
            if created:
                created_count += 1

        self.stdout.write(f"  Created {created_count} team members")

    def import_contact_info(self):
        self.stdout.write("Importing contact information...")

        contact, created = ContactInfo.objects.get_or_create(
            pk=1,
            defaults={
                "department_name": "Civil & Infrastructure Engineering Society (CIES)",
                "institution_name": "Indian Institute of Technology Jodhpur",
                "address": "NH 62, Nagaur Road, Karwar, Jodhpur, Rajasthan 342030, India",
                "email": "cies@iitj.ac.in",
                "phone": "+91-291-280-1234",
                "linkedin_url": "https://www.linkedin.com/company/cies-iitj",
                "instagram_url": "https://www.instagram.com/cies_iitj",
                "website_url": "https://iitj.ac.in/department/index.php?id=civil",
            }
        )

        if created:
            self.stdout.write("  Created contact information")
        else:
            self.stdout.write("  Contact information already exists")

