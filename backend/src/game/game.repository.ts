import { Injectable } from '@nestjs/common';
import { Match } from '@prisma/client';
import e from 'express';
import { PrismaService } from 'src/database/prisma.service';
import { DisconnectDto, MatchDto } from './dtos/input.dto';

@Injectable()
export class GameRepository {
  constructor(private readonly prisma: PrismaService) {}

  async userMatchs(userId: string): Promise<any> {
    let as_player_1 = await this.prisma.match.findMany({
      where: {
        player1_id: userId,
      },
      select: {
        score_p1: true,
        score_p2: true,
		id: true,

        player_1: {
          select: {
            id: true,
            nickname:true,
            avatar: true,
          }
        },
        player_2: {
          select: {
            id: true,
            nickname:true,
            avatar: true,
          },
        },
      }
    });
    let as_player_2 = await this.prisma.match.findMany({
      where: {
        player2_id: userId,
      },
      select: {
        score_p1: true,
        score_p2: true,
		id: true,

        player_1: {
          select: {
            id: true,
            nickname:true,
            avatar: true,
          }
        },
        player_2: {
          select: {
            id: true,
            nickname:true,
            avatar: true,
          },
        },
      }
    });
    let matches = as_player_1.concat(as_player_2);
    return matches;
  }

  async numberOfUserMatchWins(userId: string): Promise<number> {
    let wins = await this.prisma.match.count({
      where: {
        winner_id: userId,
      },
    });
    return wins;
  }

  async numberOfUserMatchLoses(userId: string): Promise<number> {
    let loses = await this.prisma.match.count({
      where: {
        loser_id: userId,
      },
    });
    return loses;
  }

  async numberOfUserMatchDraws(userId: string): Promise<number> {
    let as_Player1 = await this.prisma.match.count({
      where: {
        player1_id: userId,
        draws: true,
      },
      select: {
        draws: true,
      },
    });
    let as_Player2 = await this.prisma.match.count({
      where: {
        player2_id: userId,
        draws: true,
      },
      select: {
        draws: true,
      },
    });
    let response = as_Player1.draws + as_Player2.draws;
    return response;
  }

  async updateStatusUser(DataUser: DisconnectDto): Promise<void> {
	const {user_id, is_active} = DataUser;

	await this.prisma.user.update({
	  where: {
		id: user_id,
	  },
	  data: {
		is_active: is_active,
	  },
	});
  }

  async addMatch(dto: MatchDto): Promise <void> {
    await this.prisma.match.create({
      data: {
        player1_id: dto.player1_id,
        score_p1: dto.score_p1,
        player2_id: dto.player2_id,
        score_p2: dto.score_p2,
        winner_id: dto.winner_id,
        loser_id: dto.loser_id,
        draws: false,
      },
    });
  }

  async updateMatchStatus(player1_id: string, player2_id: string, status: string) {
    await this.prisma.user.update({
      where: {
        id: player1_id,
      },
      data: {
        match_status: status,
      },
    });
    await this.prisma.user.update({
      where: {
        id: player2_id,
      },
      data: {
        match_status: status,
      },
    });
  }
}
