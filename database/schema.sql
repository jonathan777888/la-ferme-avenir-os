CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(255),
    description TEXT,
    personality TEXT,
    visual_description TEXT,
    canon_status VARCHAR(50) DEFAULT 'validated',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    visual_style TEXT,
    rules TEXT,
    canon_status VARCHAR(50) DEFAULT 'validated',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS canon_rules (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    priority VARCHAR(50) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scenes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    location_id INTEGER REFERENCES locations(id) ON DELETE SET NULL,
    tone VARCHAR(255),
    event TEXT,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scene_characters (
    scene_id INTEGER REFERENCES scenes(id) ON DELETE CASCADE,
    character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
    PRIMARY KEY (scene_id, character_id)
);

CREATE TABLE IF NOT EXISTS continuity_checks (
    id SERIAL PRIMARY KEY,
    scene_id INTEGER REFERENCES scenes(id) ON DELETE CASCADE,
    score INTEGER,
    status VARCHAR(50),
    report JSONB,
    suggestions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS generated_prompts (
    id SERIAL PRIMARY KEY,
    scene_id INTEGER REFERENCES scenes(id) ON DELETE CASCADE,
    prompt_type VARCHAR(100),
    prompt_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO characters (name, role, description, personality, visual_description)
VALUES
('Mira prototype', 'Gardienne de la ferme', 'Personnage prototype pour tester le canon.', 'calme, strategique, protectrice', 'style manga solarpunk')
ON CONFLICT (name) DO NOTHING;

INSERT INTO locations (name, description, visual_style, rules)
VALUES
('Ferme centrale prototype', 'Lieu prototype du MVP.', 'solarpunk, lumineux, nature et technologie douce', 'Le lieu doit rester coherent avec la bible creative.')
ON CONFLICT (name) DO NOTHING;

INSERT INTO canon_rules (title, description, category, priority)
VALUES
('Monde coherent', 'Aucune scene ne doit contredire le canon valide.', 'continuity', 'high'),
('Technologie au service du vivant', 'La technologie doit soutenir la ferme et le vivant.', 'worldbuilding', 'medium'),
('Ton esperant et strategique', 'Le ton global doit rester esperant, lucide et oriente solution.', 'tone', 'medium')
ON CONFLICT (title) DO NOTHING;
