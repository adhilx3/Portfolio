import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RoadmapTracker } from './RoadmapTracker';
import type { RoadmapMilestone, PortfolioStats } from '../../types/content';

const mockMilestones: RoadmapMilestone[] = [
  {
    id: 'ms-1',
    topic: 'Network Scanning',
    category: 'CEH',
    status: 'in-progress',
    progressPercent: 70,
    detail: 'Port scanning, service enumeration.',
  },
  {
    id: 'ms-2',
    topic: 'Cryptography',
    category: 'InfoSec',
    status: 'completed',
    progressPercent: 100,
    detail: 'Symmetric and asymmetric ciphers.',
  },
];

const mockStats: PortfolioStats = {
  toolsBuilt: 5,
  labsCompleted: 40,
  domainsMastered: 7,
};

describe('RoadmapTracker component', () => {
  it('renders milestones and stats', () => {
    render(
      <RoadmapTracker
        milestones={mockMilestones}
        stats={mockStats}
        onMilestonesChange={vi.fn()}
        onStatsChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Network Scanning')).toBeInTheDocument();
    expect(screen.getByText('Cryptography')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });

  it('updates stats when user edits values', () => {
    const handleStatsChange = vi.fn();
    render(
      <RoadmapTracker
        milestones={mockMilestones}
        stats={mockStats}
        onMilestonesChange={vi.fn()}
        onStatsChange={handleStatsChange}
      />,
    );

    const toolsInput = screen.getByDisplayValue('5');
    fireEvent.change(toolsInput, { target: { value: '8' } });

    expect(handleStatsChange).toHaveBeenCalledWith({
      ...mockStats,
      toolsBuilt: 8,
    });
  });

  it('adds a new milestone when form is submitted', () => {
    const handleMilestonesChange = vi.fn();
    render(
      <RoadmapTracker
        milestones={mockMilestones}
        stats={mockStats}
        onMilestonesChange={handleMilestonesChange}
        onStatsChange={vi.fn()}
      />,
    );

    const toggleBtn = screen.getByRole('button', { name: /Add Milestone/i });
    fireEvent.click(toggleBtn);

    const topicInput = screen.getByLabelText(/Topic \/ Milestone Name/i);
    fireEvent.change(topicInput, { target: { value: 'Web App Security' } });

    const detailInput = screen.getByLabelText(/Description \/ Key Competencies/i);
    fireEvent.change(detailInput, { target: { value: 'OWASP Top 10 hands-on analysis' } });

    const submitBtn = screen.getByRole('button', { name: /Save Milestone/i });
    fireEvent.click(submitBtn);

    expect(handleMilestonesChange).toHaveBeenCalledTimes(1);
    const added = handleMilestonesChange.mock.calls[0][0];
    expect(added.length).toBe(3);
    expect(added[2].topic).toBe('Web App Security');
  });

  it('deletes a milestone', () => {
    const handleMilestonesChange = vi.fn();
    render(
      <RoadmapTracker
        milestones={mockMilestones}
        stats={mockStats}
        onMilestonesChange={handleMilestonesChange}
        onStatsChange={vi.fn()}
      />,
    );

    const deleteBtn = screen.getByLabelText(/Delete milestone Network Scanning/i);
    fireEvent.click(deleteBtn);

    expect(handleMilestonesChange).toHaveBeenCalledWith([mockMilestones[1]]);
  });
});
