import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectStudio } from './ProjectStudio';
import type { FlagshipProject } from '../../types/content';

const mockProjects: FlagshipProject[] = [
  {
    id: 'tool-1',
    repoName: 'Tool-One',
    title: 'Tool One',
    category: 'Malware Analysis',
    summary: 'First tool description',
    mechanism: 'First mechanism',
    architecture: ['Arch 1'],
    securityFocus: 'Malware triage',
    tech: ['Python'],
    commandHint: 'tool-one --scan',
    repoUrl: 'https://github.com/adhilx3/Tool-One',
  },
  {
    id: 'tool-2',
    repoName: 'Tool-Two',
    title: 'Tool Two',
    category: 'Network Recon',
    summary: 'Second tool description',
    mechanism: 'Second mechanism',
    architecture: ['Arch 2'],
    securityFocus: 'Network mapping',
    tech: ['Go'],
    commandHint: 'tool-two --recon',
    repoUrl: 'https://github.com/adhilx3/Tool-Two',
  },
];

describe('ProjectStudio component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all projects in the list', () => {
    render(<ProjectStudio projects={mockProjects} onProjectsChange={vi.fn()} />);

    expect(screen.getByText('Tool One')).toBeInTheDocument();
    expect(screen.getByText('Tool Two')).toBeInTheDocument();
    expect(screen.getByText('2 of 2 Tools')).toBeInTheDocument();
  });

  it('filters tools based on search query', () => {
    render(<ProjectStudio projects={mockProjects} onProjectsChange={vi.fn()} />);

    const searchInput = screen.getByPlaceholderText(/Filter tools/i);
    fireEvent.change(searchInput, { target: { value: 'Network' } });

    expect(screen.queryByText('Tool One')).not.toBeInTheDocument();
    expect(screen.getByText('Tool Two')).toBeInTheDocument();
    expect(screen.getByText('1 of 2 Tools')).toBeInTheDocument();
  });

  it('reorders tools when move down button is clicked', () => {
    const handleChange = vi.fn();
    render(<ProjectStudio projects={mockProjects} onProjectsChange={handleChange} />);

    const moveDownBtn = screen.getByLabelText('Move Tool One down');
    fireEvent.click(moveDownBtn);

    expect(handleChange).toHaveBeenCalledWith([mockProjects[1], mockProjects[0]]);
  });

  it('opens modal to add new project and applies preset', () => {
    const handleChange = vi.fn();
    render(<ProjectStudio projects={mockProjects} onProjectsChange={handleChange} />);

    const addBtn = screen.getByRole('button', { name: /Add Security Tool/i });
    fireEvent.click(addBtn);

    expect(screen.getByText('Add New Security Tool')).toBeInTheDocument();

    const presetBtn = screen.getByRole('button', { name: /Load dns-recon Preset/i });
    fireEvent.click(presetBtn);

    expect(screen.getByDisplayValue('dns-recon Scanner')).toBeInTheDocument();
  });
});
