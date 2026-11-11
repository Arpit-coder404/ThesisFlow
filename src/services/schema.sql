-- =========================================================================
-- THESISFLOW SUPABASE POSTGRESQL SCHEMA
-- Academic Research, Thesis Writing & Institutional Collaboration Workspace
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DEPARTMENTS
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    faculty VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL DEFAULT 'Imperial College London',
    code VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. USERS & PROFILES
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'supervisor', 'admin')),
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    academic_title VARCHAR(100),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. RESEARCH PROJECTS
CREATE TABLE IF NOT EXISTS research_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    research_area VARCHAR(255) NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    program VARCHAR(150) NOT NULL,
    project_type VARCHAR(50) NOT NULL CHECK (project_type IN ('undergraduate', 'masters', 'doctoral', 'paper', 'capstone', 'independent')),
    status VARCHAR(50) NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'under_review', 'revision_required', 'ready_for_defense', 'completed')),
    lead_researcher_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    supervisor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    start_date DATE NOT NULL,
    expected_submission_date DATE NOT NULL,
    abstract TEXT,
    keywords TEXT[] DEFAULT '{}',
    visibility VARCHAR(50) DEFAULT 'private' CHECK (visibility IN ('private', 'department', 'public')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_projects_lead ON research_projects(lead_researcher_id);
CREATE INDEX idx_projects_supervisor ON research_projects(supervisor_id);

-- 4. PROJECT COLLABORATORS
CREATE TABLE IF NOT EXISTS project_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'collaborator' CHECK (role IN ('lead', 'collaborator', 'supervisor', 'advisor', 'reviewer')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(project_id, user_id)
);

-- 5. RESEARCH GAPS
CREATE TABLE IF NOT EXISTS research_gaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. RESEARCH QUESTIONS
CREATE TABLE IF NOT EXISTS research_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    gap_id UUID REFERENCES research_gaps(id) ON DELETE SET NULL,
    code VARCHAR(20) NOT NULL, -- e.g. 'RQ1'
    question TEXT NOT NULL,
    description TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. RESEARCH OBJECTIVES
CREATE TABLE IF NOT EXISTS research_objectives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    linked_question_id UUID REFERENCES research_questions(id) ON DELETE CASCADE,
    code VARCHAR(20) NOT NULL, -- e.g. 'OBJ1'
    objective TEXT NOT NULL,
    methodology_overview TEXT,
    status VARCHAR(50) DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. LITERATURE COLLECTIONS
CREATE TABLE IF NOT EXISTS literature_collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    color VARCHAR(30) DEFAULT '#345B46',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. LITERATURE PAPERS
CREATE TABLE IF NOT EXISTS literature_papers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    authors TEXT[] NOT NULL DEFAULT '{}',
    year INT NOT NULL,
    journal_or_conference VARCHAR(300),
    doi VARCHAR(255),
    url TEXT,
    abstract TEXT,
    keywords TEXT[] DEFAULT '{}',
    research_area VARCHAR(200),
    publication_type VARCHAR(50) DEFAULT 'journal' CHECK (publication_type IN ('journal', 'conference', 'preprint', 'book_chapter', 'thesis')),
    reading_status VARCHAR(50) DEFAULT 'unread' CHECK (reading_status IN ('unread', 'reading', 'read')),
    relevance_rating INT CHECK (relevance_rating BETWEEN 1 AND 5),
    personal_notes TEXT,
    pdf_url TEXT,
    page_count INT,
    tags TEXT[] DEFAULT '{}',
    is_key_paper BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_papers_project ON literature_papers(project_id);
CREATE INDEX idx_papers_reading_status ON literature_papers(reading_status);

-- 10. PAPER COLLECTION ITEMS (MANY TO MANY)
CREATE TABLE IF NOT EXISTS paper_collection_items (
    collection_id UUID NOT NULL REFERENCES literature_collections(id) ON DELETE CASCADE,
    paper_id UUID NOT NULL REFERENCES literature_papers(id) ON DELETE CASCADE,
    PRIMARY KEY(collection_id, paper_id)
);

-- 11. PAPER ANNOTATIONS
CREATE TABLE IF NOT EXISTS paper_annotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paper_id UUID NOT NULL REFERENCES literature_papers(id) ON DELETE CASCADE,
    page_number INT NOT NULL,
    selected_text TEXT,
    comment TEXT NOT NULL,
    color VARCHAR(30) DEFAULT 'yellow' CHECK (color IN ('yellow', 'green', 'terracotta', 'sage')),
    research_insight TEXT,
    linked_question_id UUID REFERENCES research_questions(id) ON DELETE SET NULL,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. RESEARCH NOTES
CREATE TABLE IF NOT EXISTS research_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    note_type VARCHAR(50) NOT NULL CHECK (note_type IN ('reading', 'methodology', 'experiment', 'meeting', 'idea', 'finding', 'supervisor_question')),
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. NOTE LINKS (Bidirectional knowledge graph)
CREATE TABLE IF NOT EXISTS note_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    note_id UUID NOT NULL REFERENCES research_notes(id) ON DELETE CASCADE,
    linked_type VARCHAR(50) NOT NULL CHECK (linked_type IN ('paper', 'question', 'objective', 'chapter', 'experiment')),
    target_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. LITERATURE MATRIX
CREATE TABLE IF NOT EXISTS literature_matrix (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    paper_id UUID NOT NULL REFERENCES literature_papers(id) ON DELETE CASCADE,
    research_problem TEXT,
    methodology TEXT,
    dataset TEXT,
    key_findings TEXT,
    limitations TEXT,
    research_gap TEXT,
    relevance_to_my_work TEXT,
    custom_columns JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15. THESIS CHAPTERS
CREATE TABLE IF NOT EXISTS thesis_chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    number INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'ready_for_review', 'submitted', 'under_review', 'revision_requested', 'resubmitted', 'approved')),
    content TEXT DEFAULT '', -- HTML / TipTap content
    target_word_count INT DEFAULT 4000,
    current_word_count INT DEFAULT 0,
    ready_for_review BOOLEAN DEFAULT FALSE,
    last_saved TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16. CHAPTER SECTIONS
CREATE TABLE IF NOT EXISTS chapter_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_id UUID NOT NULL REFERENCES thesis_chapters(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    level INT NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 1
);

-- 17. DOCUMENT VERSIONS
CREATE TABLE IF NOT EXISTS document_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_id UUID NOT NULL REFERENCES thesis_chapters(id) ON DELETE CASCADE,
    version_number INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    word_count INT NOT NULL,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 18. REFERENCES
CREATE TABLE IF NOT EXISTS references_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    paper_id UUID REFERENCES literature_papers(id) ON DELETE SET NULL,
    citation_key VARCHAR(100) NOT NULL,
    entry_type VARCHAR(50) NOT NULL,
    title VARCHAR(500) NOT NULL,
    authors TEXT[] NOT NULL DEFAULT '{}',
    year INT NOT NULL,
    journal VARCHAR(300),
    booktitle VARCHAR(300),
    volume VARCHAR(50),
    issue VARCHAR(50),
    pages VARCHAR(50),
    publisher VARCHAR(200),
    doi VARCHAR(255),
    url TEXT,
    bibtex TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 19. METHODOLOGY & STEPS
CREATE TABLE IF NOT EXISTS methodologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE UNIQUE,
    research_design TEXT,
    research_approach VARCHAR(100),
    data_collection_method TEXT,
    dataset_description TEXT,
    sampling_method TEXT,
    tools_and_tech TEXT[] DEFAULT '{}',
    experimental_setup TEXT,
    evaluation_metrics TEXT[] DEFAULT '{}',
    validation_strategy TEXT,
    ethical_considerations TEXT,
    limitations TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS methodology_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    methodology_id UUID NOT NULL REFERENCES methodologies(id) ON DELETE CASCADE,
    sort_order INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    tools TEXT[] DEFAULT '{}',
    input_desc TEXT,
    output_desc TEXT,
    linked_question_code VARCHAR(20)
);

-- 20. DATASETS & EXPERIMENTS
CREATE TABLE IF NOT EXISTS datasets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    name VARCHAR(300) NOT NULL,
    source VARCHAR(300),
    description TEXT,
    version VARCHAR(50) DEFAULT '1.0',
    collection_date DATE,
    size VARCHAR(50),
    row_count BIGINT,
    format VARCHAR(50),
    license VARCHAR(100),
    access_url TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    experiment_code VARCHAR(50) NOT NULL,
    name VARCHAR(300) NOT NULL,
    objective TEXT,
    related_question_code VARCHAR(20),
    dataset_id UUID REFERENCES datasets(id) ON DELETE SET NULL,
    method VARCHAR(255),
    algorithm VARCHAR(255),
    configuration JSONB DEFAULT '{}'::jsonb,
    environment VARCHAR(300),
    start_date DATE,
    end_date DATE,
    metrics JSONB DEFAULT '{}'::jsonb,
    observations TEXT,
    conclusion TEXT,
    is_best_performing BOOLEAN DEFAULT FALSE,
    linked_chapter_id UUID REFERENCES thesis_chapters(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 21. SUPERVISOR FEEDBACK & COMMENTS
CREATE TABLE IF NOT EXISTS supervisor_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    chapter_id UUID NOT NULL REFERENCES thesis_chapters(id) ON DELETE CASCADE,
    submission_version INT NOT NULL,
    reviewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    submission_date DATE NOT NULL,
    review_date DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'revision_requested', 'resubmitted', 'approved')),
    overall_comments TEXT,
    action_required TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS feedback_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    feedback_id UUID NOT NULL REFERENCES supervisor_feedback(id) ON DELETE CASCADE,
    page_or_section VARCHAR(200),
    quote_text TEXT,
    comment TEXT NOT NULL,
    reviewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    resolved BOOLEAN DEFAULT FALSE,
    resolution_note TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 22. MEETINGS & NOTES
CREATE TABLE IF NOT EXISTS meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    meeting_date DATE NOT NULL,
    meeting_time TIME NOT NULL,
    duration_minutes INT DEFAULT 45,
    location_or_link VARCHAR(300),
    agenda TEXT[] DEFAULT '{}',
    notes TEXT,
    decisions TEXT[] DEFAULT '{}',
    action_items JSONB DEFAULT '[]'::jsonb,
    next_meeting_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 23. MILESTONES & TASKS
CREATE TABLE IF NOT EXISTS milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    sort_order INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    deadline DATE NOT NULL,
    owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('completed', 'in_progress', 'pending')),
    dependencies TEXT[] DEFAULT '{}',
    related_chapter_title VARCHAR(300),
    evidence_of_completion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    deadline DATE,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('urgent', 'high', 'medium', 'low')),
    status VARCHAR(30) DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'blocked', 'completed')),
    milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
    assignee_id UUID REFERENCES users(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 24. SUBMISSION CHECKLIST
CREATE TABLE IF NOT EXISTS submission_checklists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL CHECK (category IN ('document', 'academic', 'administrative')),
    label VARCHAR(300) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP WITH TIME ZONE,
    is_required BOOLEAN DEFAULT TRUE,
    notes TEXT
);

-- 25. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL,
    link TEXT,
    read BOOLEAN DEFAULT FALSE,
    project_id UUID REFERENCES research_projects(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 26. ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES research_projects(id) ON DELETE CASCADE,
    actor_name VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    target VARCHAR(300) NOT NULL,
    icon_type VARCHAR(50) DEFAULT 'document',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE research_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE thesis_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE supervisor_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE literature_papers ENABLE ROW LEVEL SECURITY;

-- Student policy: can read and write projects they lead or collaborate on
CREATE POLICY "Students manage own projects" ON research_projects
    FOR ALL
    USING (
        auth.uid() = lead_researcher_id 
        OR auth.uid() IN (SELECT user_id FROM project_members WHERE project_id = research_projects.id)
    );

-- Supervisor policy: can read and review assigned projects
CREATE POLICY "Supervisors view and comment on assigned projects" ON research_projects
    FOR SELECT
    USING (
        auth.uid() = supervisor_id 
        OR auth.uid() IN (SELECT user_id FROM project_members WHERE project_id = research_projects.id AND role = 'supervisor')
    );

-- Admin policy: institutional administrators have full oversight
CREATE POLICY "Admins have institutional oversight" ON research_projects
    FOR ALL
    USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

